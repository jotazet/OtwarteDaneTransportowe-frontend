FROM nginx:alpine

# Copy the HTML, CSS, and JS files into the Nginx server directory
COPY Webpage/ /usr/share/nginx/html/

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port the app runs on
EXPOSE 80