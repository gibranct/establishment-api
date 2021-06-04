FROM node:12 as build

WORKDIR /opt/app

COPY . .

RUN npm install && npm run build

FROM node:12-alpine

WORKDIR /opt/app

COPY --from=build /opt/app/server.prod.js ./server.prod.js
COPY --from=build /opt/app/.env ./.env
COPY --from=build /opt/app/package* .

RUN npm install --only=production

ENTRYPOINT [ "node", "server.prod.js" ]





