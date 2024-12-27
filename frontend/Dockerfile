# Use Node.js for building the frontend
FROM node:18-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the app source code and build the React app
COPY . ./
RUN yarn build

# Serve the React app using Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
