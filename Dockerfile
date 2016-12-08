FROM node:5.11
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./source/ /usr/src/app/
RUN npm install
EXPOSE 24790 24890
cmd [ "npm", "start" ]
