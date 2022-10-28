FROM node:16

WORKDIR /api

COPY package*.json ./

RUN npm install nodemon -g

COPY . .
EXPOSE 3000