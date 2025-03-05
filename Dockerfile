# Use Node.js official image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the app
COPY . .

# Build the Next.js app in standalone mode
RUN npm run build

# Switch to a minimal runtime image for production
FROM node:18-alpine

WORKDIR /app

# Copy only the built output from the previous step
COPY --from=0 /app/.next/standalone ./
COPY --from=0 /app/public ./public
COPY --from=0 /app/.next/static ./.next/static

# Expose the port (Railway will assign a random one)
EXPOSE 3000

# Run the standalone server
CMD ["node", "server.js"]
