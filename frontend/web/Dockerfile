FROM node:20.11-alpine3.18

WORKDIR /web

COPY package*.json .

RUN npm install

COPY *config* .

COPY . .

EXPOSE 5173

ENTRYPOINT [ "npm", "run", "dev" ]
