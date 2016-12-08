FROM node:5.11
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./site/ /usr/src/app/
RUN npm install
EXPOSE 8081
cmd [ "node", "app.js" ]
