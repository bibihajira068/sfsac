# Use Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install dependencies
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Copy the application code
COPY frontend/ .

# Build the React application
RUN npm run build

# Serve the application using a static server
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
