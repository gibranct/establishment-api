FROM node:12 as build

WORKDIR /opt/app

COPY . .

RUN npm install && npm run build

FROM node:12-alpine

WORKDIR /opt/app

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY --from=build /opt/app/server.prod.js ./server.prod.js
COPY --from=build /opt/app/.env ./.env
COPY --from=build /opt/app/package* .

RUN npm install --only=production

EXPOSE 4000

ENTRYPOINT [ "node", "server.prod.js" ]






