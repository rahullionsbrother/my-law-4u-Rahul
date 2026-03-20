# ==============================================================================
# MYLAW.COM - POSTGRES DATABASE DOCKERFILE
# ==============================================================================

# 1. Start with the official, lightweight Alpine image from Docker Hub
FROM postgres:15-alpine

# 2. Copy our custom initialization script into the container
# Postgres will automatically run any scripts found in this directory on startup
COPY init.sql /docker-entrypoint-initdb.d/

# 3. Expose the default Postgres port
EXPOSE 5432