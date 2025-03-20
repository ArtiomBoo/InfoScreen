# Stage 1: Compile and Build Angular Codebase

# Use official node image as the base image
FROM node:latest as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to the app
COPY ./ /usr/local/app/

# Install all dependencies
RUN npm install

# Generate the build of the application
RUN npm run build


# Stage 2: Serve the app with nginx server

# Use the official nginx image as the base image
FROM nginx:latest

# Set working directory inside Nginx
WORKDIR /usr/share/nginx/html

# Copy the build output from Angular
COPY --from=build /usr/local/app/dist/infoscreen /usr/share/nginx/html

# Copy Nginx configuration
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy the environment variable template and entrypoint script
COPY env.template.js /usr/share/nginx/html/assets/env.js
COPY entrypoint.sh /entrypoint.sh

# Give execute permission to entrypoint script
RUN chmod +x /entrypoint.sh

# Set the entrypoint script to run before starting Nginx
ENTRYPOINT ["/entrypoint.sh"]

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
