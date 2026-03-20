# ------------------------------------------------------------------------------
# STAGE 1: BUILD ENVIRONMENT (Compiles the React Code)
# ------------------------------------------------------------------------------
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependency manifests and install
COPY package.json package-lock.json* ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# ------------------------------------------------------------------------------
# STAGE 2: PRODUCTION ENVIRONMENT (Serves via Nginx)
# ------------------------------------------------------------------------------
FROM nginx:stable-alpine

# Remove default Nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy compiled files from Stage 1
COPY --from=builder /app/build /usr/share/nginx/html

# Copy our custom Nginx SPA configuration
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]