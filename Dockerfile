FROM nginx:alpine

# Hapus konfigurasi default nginx
RUN rm -rf /usr/share/nginx/html/*

# Copy all file web to direktori html nginx
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80