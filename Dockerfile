FROM alpine:3.20

ENV NODE_VERSION 20.8.1

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm clean install

COPY --chown=node:node . .

EXPOSE 3000

ENTRYPOINT ["npm","start"]

