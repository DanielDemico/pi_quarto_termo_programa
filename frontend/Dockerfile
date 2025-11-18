FROM node:20-alpine

# Set work directory
WORKDIR /app

# Copy package files
COPY pi_front/package*.json ./

# Install ALL dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY pi_front/ .

# Build the application
RUN npm run build

# Expose port
EXPOSE 5173

# Start the application
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]