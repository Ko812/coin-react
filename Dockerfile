FROM npm:10.8.0 AS builder

RUN npm ci
ENTRYPOINT ["npm","start"]

