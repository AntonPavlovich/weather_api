FROM node:18-alpine

WORKDIR /server

COPY . .

RUN npm i

EXPOSE 5000

CMD npm run build && npm run start:dev