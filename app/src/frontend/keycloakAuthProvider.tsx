import React, { createContext, useContext, useState, useEffect } from "react";

const Keycloak = require('keycloak-js').default;

// Keycloak-Konfiguration
const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "building-data-trustee-realm",
  clientId: "building-data-trustee",
});

// Keycloak Auth Context Type
type KeycloakAuthContextState = {
  initialized: boolean;
  authenticated: boolean;
  login: () => void;
  logout: () => void;
  token?: string;
};

const KeycloakAuthContext = createContext<KeycloakAuthContextState | undefined>(undefined);

export const KeycloakAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Make the effect async and handle the Keycloak initialization with await
    const initKeycloak = async () => {
      try {
        const auth = await keycloak.init({
          onLoad: "login",
          checkLoginIframe: false,
        });
        console.log("Authenticated:", auth);
        setAuthenticated(auth);
        setToken(auth ? keycloak.token : undefined);
        setInitialized(true);
      } catch (error) {
        console.error("Keycloak-Initialisierung fehlgeschlagen:", error);
        setInitialized(true);
        setAuthenticated(false);
      }

      // Registering event handlers for Keycloak events
      keycloak.onAuthSuccess = () => {
        setAuthenticated(true);
        setToken(keycloak.token);
      };

      keycloak.onAuthError = () => {
        setAuthenticated(false);
        setToken(undefined);
      };

      keycloak.onAuthLogout = () => {
        setAuthenticated(false);
        setToken(undefined);
      };

      keycloak.onTokenExpired = async () => {
        try {
          const refreshed = await keycloak.updateToken(30);
          if (refreshed) {
            setToken(keycloak.token);
          }
        } catch {
          setAuthenticated(false);
          setToken(undefined);
        }
      };
    };

    initKeycloak(); // Initialize Keycloak when the component mounts
  }, []); // Empty dependency array to run only once when the component mounts

  // Login and logout methods
  const login = () => keycloak.login();
  const logout = () => keycloak.logout({ redirectUri: window.location.origin });

  return (
    <KeycloakAuthContext.Provider value={{ initialized, authenticated, login, logout, token }}>
      {children}
    </KeycloakAuthContext.Provider>
  );
};

// Custom Hook for Keycloak Auth
export const useKeycloakAuth = () => {
  const context = useContext(KeycloakAuthContext);
  if (!context) {
    throw new Error("useKeycloakAuth must be used within a KeycloakAuthProvider");
  }
  return context;
};


/* import React, { createContext, useContext, useState, useEffect, PropsWithChildren, ReactNode } from "react";
const Keycloak = require("keycloak-js").default;

const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "building-data-trustee-realm",
  clientId: "building-data-trustee",
});

type KeycloakAuthContextState = {
  initialized: boolean;
  authenticated: boolean;
  login: () => void;
  logout: () => void;
  token?: string;
};

const KeycloakAuthContext = createContext<KeycloakAuthContextState | undefined>(undefined);

export const KeycloakAuthProvider: React.FC<PropsWithChildren<{ children: ReactNode }>> = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const initKeycloak = async () => {
      try {
        const authenticated = await keycloak.init(
          {
            onLoad: "login",
            checkLoginIframe: false,
          }
        );

        setInitialized(true);
        setAuthenticated(authenticated);
  
        if (authenticated) {
          console.log('User is authenticated');
          setToken(keycloak.token); // Set token if authenticated
        } else {
          console.log('User is not authenticated');
        }
      } catch (error) {
        console.error('Failed to initialize Keycloak adapter:', error);
      }
    };
  
    initKeycloak();
  }, []);  

  const login = async () => {
    // This will open the login page if not authenticated
    await keycloak.login();
  };

  const logout = () => {
    keycloak.logout({ redirectUri: window.location.origin });
  };

  return (
    <KeycloakAuthContext.Provider value={{ initialized, authenticated, login, logout, token }}>
      {children}
    </KeycloakAuthContext.Provider>
  );
};

export const useKeycloakAuth = () => {
  const context = useContext(KeycloakAuthContext);
  if (!context) {
    throw new Error("useKeycloakAuth must be used within a KeycloakAuthProvider");
  }
  return context;
}; */

