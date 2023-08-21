FROM node:latest

RUN mkdir -p /usr/src/discord-bot

WORKDIR /usr/src/discord-bot

COPY package*.json ./

RUN npm install

EXPOSE 3000
EXPOSE 8080
EXPOSE 80

COPY . .

CMD ["node", "main.js"]
