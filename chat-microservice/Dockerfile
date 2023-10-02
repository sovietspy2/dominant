# Use a base image with Node.js (you can adjust this based on your app's requirements)
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 8888 (the port your WebSocket app will listen on)
EXPOSE 8888

# Command to start your WebSocket app (adjust as needed)
CMD ["node", "server.js"]