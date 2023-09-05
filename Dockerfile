FROM node:20

RUN apt-get update -y

WORKDIR /app

RUN npm install -g newman

COPY . .

RUN npm install fastify dotenv
RUN npm install -g newman-reporter-json-summary

CMD ["node","server.js"]

EXPOSE 5030