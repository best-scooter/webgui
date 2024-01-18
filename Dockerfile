FROM node:17-alpine as builder

WORKDIR /customer-webgui
# COPY package.json .
# COPY package-lock.json .
# RUN npm i
RUN npm install --global serve

COPY ./build ./build

EXPOSE 3000

CMD ["serve", "-s", "build"]