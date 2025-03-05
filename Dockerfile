# Stage 1: Build the Next.js app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application
COPY . .

# Build Next.js with standalone output
RUN npm run build

# Stage 2: Create the final runtime image
FROM node:18-alpine

WORKDIR /app

# Copy the standalone server files
COPY --from=builder /app/.next/standalone ./

# Copy the static and public assets
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Ensure all dependencies are copied correctly
COPY --from=builder /app/node_modules ./node_modules

# Expose the port for Railway
EXPOSE 3000

# Run the standalone server
CMD ["node", ".next/standalone/server.js"]
