FROM node:20

RUN apt-get update && apt-get install -y netcat-openbsd

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x docker-entrypoint.sh

EXPOSE 3001

CMD ["./docker-entrypoint.sh"]