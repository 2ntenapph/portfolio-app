# Stage 1: Build Next.js app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy the entire project
COPY . .

# Build Next.js app (Standalone Mode)
RUN npm run build

# Stage 2: Production-ready container
FROM node:18-alpine

WORKDIR /app

# Expose port (Railway assigns a random port, so use ENV variable)
EXPOSE 3000

# Run the standalone server
CMD ["node", ".next/standalone/server.js"]
