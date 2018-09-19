FROM node:10-alpine


RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY . /usr/app

RUN npm install --quiet


