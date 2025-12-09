# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy the rest of the code
COPY . .

# Set environment
ENV NODE_ENV=production

# Render injects PORT, default 10000
EXPOSE 10000

# Start server
CMD ["node", "main.js"]
