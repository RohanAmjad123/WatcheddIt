# syntax=docker/dockerfile:1

FROM node:17.5.0 as base

WORKDIR /app

EXPOSE 3000

COPY ["package.json", "package-lock.json*", "./"]

FROM base as test
ENV NODE_ENV=test
RUN npm ci
COPY . .
RUN npm run test

FROM base as prod
ENV NODE_ENV=production
RUN npm ci --production
COPY . .
CMD [ "node", "server.js" ]