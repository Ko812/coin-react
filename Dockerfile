FROM alpine:3.19

RUN npm ci
ENTRYPOINT ["npm","start"]

