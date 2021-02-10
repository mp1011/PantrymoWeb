# pull official base image
FROM httpd:2.4
COPY ./httpd.conf /usr/local/apache2/conf/httpd.conf

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json /usr/local/apache2/htdocs/
COPY package-lock.json /usr/local/apache2/htdocs/

# add app
COPY dist /usr/local/apache2/htdocs/