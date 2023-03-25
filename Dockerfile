FROM node:18.14.2

RUN mkdir /app

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 8080


