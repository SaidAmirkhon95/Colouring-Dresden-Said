import express from 'express';
import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import fetch from 'node-fetch';

const sustainabilityRouter = express.Router();

const JWKS_URL = 'http://localhost:8080/realms/building-data-trustee-realm/protocol/openid-connect/certs';
const HOUSEHOLD_API_URL = 'http://localhost:3003/households';

let jwks: any = { keys: [] };

// 🔹 Fetch Keycloak Public Keys for Token Verification
async function fetchJwks() {
    try {
        const response = await fetch(JWKS_URL);
        jwks = await response.json();
        console.log('✅ JWKS keys refreshed successfully');
    } catch (error) {
        console.error('❌ Failed to fetch JWKS:', error);
    }
}

// Fetch the JWKS on startup and refresh every 10 minutes
fetchJwks();
setInterval(fetchJwks, 600000);

const verifyToken = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: '❌ No token provided' });
    }

    // 🔹 Decode JWT to get header info
    const decoded = jwt.decode(token, { complete: true });
    if (!decoded || !decoded.header || !decoded.header.kid) {
        return res.status(401).json({ error: '❌ Invalid token (missing key ID)' });
    }

    console.log('🔹 Token Key ID:', decoded.header.kid);

    // 🔹 Find the correct signing key (`use: "sig"`)
    const key = jwks.keys.find(
        (k: any) => k.kid === decoded.header.kid && k.use === "sig"
    );

    if (!key) {
        return res.status(401).json({ error: '❌ No valid signing key found in JWKS' });
    }

    console.log('✅ Found valid signing key:', key.kid);

    try {
        const pem = jwkToPem(key);

        jwt.verify(token, pem, (err: any, decodedToken: any) => {
            if (err) {
                console.error('❌ Token verification failed:', err);
                return res.status(403).json({ error: '❌ Invalid or expired token' });
            }

            console.log('✅ Token successfully verified');

            // 🔹 Check if user has the required role
            const roles = decodedToken?.resource_access?.['building-data-trustee']?.roles || [];
            if (!roles.includes('user')) {
                return res.status(403).json({ error: '❌ Missing required role: user' });
            }

            req.user = decodedToken;
            next();
        });
    } catch (error) {
        console.error('❌ Error processing public key:', error);
        return res.status(500).json({ error: '❌ Internal server error' });
    }
};

// 🔹 Forward Authenticated Requests to Household API
sustainabilityRouter.all('/*', verifyToken, async (req, res) => {
    try {
        const response = await fetch(`${HOUSEHOLD_API_URL}${req.url}`, {
            method: req.method,
            headers: {
                'Authorization': req.headers.authorization || '',
                'Content-Type': 'application/json',
            },
            body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
        });

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        console.error('❌ Error forwarding request to Household API:', error);
        res.status(500).json({ error: '❌ Failed to connect to Household API' });
    }
});

export default sustainabilityRouter;
