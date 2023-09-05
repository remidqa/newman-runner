FROM node:20

#ENV POSTMAN_API_KEY=
#ENV API_QA_INT_URL=

RUN apt-get update -y

WORKDIR /app

RUN npm install -g newman

COPY . .

RUN npm install fastify dotenv glob
RUN npm install -g newman-reporter-json-summary

CMD ["node","server.js"]

EXPOSE 5030