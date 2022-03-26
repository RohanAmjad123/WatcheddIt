# syntax=docker/dockerfile:1

FROM node:17.5.0

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD [ "node", "server.js" ]

EXPOSE 3000