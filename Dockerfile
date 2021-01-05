# Dockerfile
FROM node:10.23

ENV HOME=/usr/src/adonis-api

# create destination directory
RUN mkdir -p $HOME
WORKDIR $HOME

# copy the app, note .dockerignore
COPY . $HOME
RUN npm install

EXPOSE 8000

ENV HOST=0.0.0.0
CMD [ "npm", "start" ]