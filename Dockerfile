# Use Node.js official image (not Alpine for better compatibility)
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy the rest of the app
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the correct port
EXPOSE 3000

# Start the Next.js server in production mode
CMD ["npm", "run", "start"]
