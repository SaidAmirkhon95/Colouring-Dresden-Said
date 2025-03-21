# Use the official Keycloak image
FROM quay.io/keycloak/keycloak:26.1.0

# Enable health and metrics support
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

# Expose Keycloak's default port
EXPOSE 8080

# Set environment variables for admin user creation
ENV KEYCLOAK_ADMIN=admin
ENV KEYCLOAK_ADMIN_PASSWORD=admin

# Database connection settings
ENV KC_DB=postgres
ENV KC_DB_URL_HOST=postgres
ENV KC_DB_URL_PORT=5432
ENV KC_DB_URL_DATABASE=dresdendb
ENV KC_DB_USERNAME=alma_user
ENV KC_DB_PASSWORD=CD2024
ENV KC_DB_SCHEMA=public
ENV KC_DB_DRIVER=org.postgresql.Driver

# Enable realm import on startup
ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start", "--import-realm", "--hostname-strict=false"]
