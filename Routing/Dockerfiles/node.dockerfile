FROM node:alpine

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
RUN npm install

COPY ../src/JS/dist /usr/src/app/src/JS/dist
COPY ../src/JS/styles /usr/src/app/src/JS/styles
COPY ../src/JS/index.html /usr/src/app/src/JS/index.html


RUN npm install http-server -g
CMD ["http-server", "src/JS", "-p", "3000"]
