FROM node:16

WORKDIR /usr/src/api

COPY package.json package.json

RUN npm install 

RUN npm install ts-node @types/node -g --save-dev 
RUN npm install nodemon -g

COPY . .

EXPOSE 3000