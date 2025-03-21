import session, { MemoryStore } from "express-session";
import Keycloak from "keycloak-connect";

const memoryStore: MemoryStore = new session.MemoryStore();

const keycloak: Keycloak.Keycloak = new Keycloak(
  { store: memoryStore },
  {
    realm: "building-data-trustee-realm",
    "auth-server-url": "http://localhost:8080/",
    "ssl-required": "external",
    resource: "building-data-trustee",
    "bearer-only": true,
    "confidential-port": 0,
  }
);

export { keycloak, memoryStore };
