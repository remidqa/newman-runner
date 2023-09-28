FROM node:20

#ENV POSTMAN_API_KEY=
#ENV API_QA_INT_URL=

RUN apt-get update -y

WORKDIR /app

COPY . .

RUN npm install
RUN npm install -g newman newman-reporter-json-summary

CMD ["node","server.js"]

EXPOSE 5030
