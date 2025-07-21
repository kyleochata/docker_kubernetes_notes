FROM nginx:1.27.0

RUN apt-get update
# -y flag will auto 'yes' to confirm install
RUN apt-get -y install vim

# <source> /usr/share/nginx/html/index.html
# copying the index.html from the curDir to the specified path
COPY index.html /usr/share/nginx/html/index.html
# Change ownership to resolve 403 status error
RUN chown nginx:nginx /usr/share/nginx/html/index.html