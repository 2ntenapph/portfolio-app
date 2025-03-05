# Use Node.js official image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies correctly
RUN npm ci --production

# Copy the rest of the app
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the correct port
EXPOSE 3000

# Start the Next.js server in production mode
CMD ["node", ".next/standalone/server.js"]
