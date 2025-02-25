# Start with a base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json to install dependencies
COPY package.json ./  package-lock.json ./

# Install dependencies
RUN npm install 


# Copy the rest of the application code
COPY . .

# Expose a port to access the backend
EXPOSE 4000           

# Start the backend server
CMD ["node", "server.js"]
