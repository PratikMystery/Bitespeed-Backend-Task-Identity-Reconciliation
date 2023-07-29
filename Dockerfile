# Specify the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .
RUN chmod +x wait-for-it.sh
RUN chmod +x entrypoint.sh

# Expose the port your Node.js app is listening on (if necessary)
EXPOSE 3000

# Set the entrypoint for the container
CMD ["./entrypoint.sh"]
