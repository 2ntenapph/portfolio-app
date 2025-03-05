# Stage 1: Build Next.js app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy the entire app
COPY . .

# Build Next.js app in standalone mode
RUN npm run build

# Stage 2: Production-ready container
FROM node:18-alpine

WORKDIR /app

# Copy standalone output
COPY --from=builder /app/.next/standalone ./

# Copy public assets (for static files like images, fonts, etc.)
COPY --from=builder /app/public ./public

# Copy Next.js static assets (for styles and JS)
COPY --from=builder /app/.next/static ./.next/static

# Expose port (Railway uses dynamic ports, so ensure your app listens to `process.env.PORT`)
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
