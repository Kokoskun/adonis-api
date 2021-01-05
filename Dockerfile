# Dockerfile
FROM node:10.15.0

# create destination directory
RUN mkdir -p /usr/src/adonis-api
WORKDIR /usr/src/adonis-api

# copy the app, note .dockerignore
COPY . /usr/src/adonis-api/
RUN npm install

EXPOSE 8000

CMD [ "npm", "start" ]