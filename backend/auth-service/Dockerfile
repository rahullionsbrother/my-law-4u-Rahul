# ==============================================================================
# MYLAW.COM - AUTH SERVICE DOCKERFILE
# ==============================================================================

# 1. Base Image: Use the lightweight Alpine Linux version of Node 18
FROM node:18-alpine

# 2. Set the working directory inside the container
WORKDIR /usr/src/app

# 3. Copy package.json and package-lock.json first
# This leverages Docker's layer caching so we don't reinstall npm packages every time code changes
COPY package*.json ./

# 4. Install only production dependencies (ignoring devDependencies like nodemon)
# We are using 'npm install' to avoid the strict lockfile issues we saw on the frontend
RUN npm install --omit=dev

# 5. Copy the rest of the application source code
COPY . .

# 6. Expose the port the app runs on (matches the PORT in server.js)
EXPOSE 8080

# 7. Define the command to run the application
# This uses the "start" script defined in your package.json (node src/server.js)
CMD ["npm", "start"]