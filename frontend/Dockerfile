# Use a lightweight web server as the base image
FROM nginx:alpine

# Copy the static HTML files to the web server directory
COPY ./dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for serving the static files
EXPOSE 80

# Start the web server
CMD ["nginx", "-g", "daemon off;"]