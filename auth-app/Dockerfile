# Use the official Node.js 20 image
FROM node:20

# Create and set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port 3000 (default port for Express server) -  read from .env file
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
