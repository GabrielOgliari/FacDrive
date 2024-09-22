FROM node:alpine

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
RUN npm install

COPY ../src/JS /usr/src/app/
COPY ../webpack.config.js /usr/src/app/webpack.config.js

RUN npm run build

RUN npm install http-server -g
CMD ["http-server", "-p", "3000"]
