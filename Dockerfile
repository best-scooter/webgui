FROM node:17-alpine as builder

WORKDIR /customer-webgui
COPY package.json .
COPY package-lock.json .
RUN npm i

COPY . .

EXPOSE 3000

CMD ["npm","start"]