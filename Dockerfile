# Dockerfile para o Service 1
FROM node:20-alpine

WORKDIR /account-service

COPY yarn*.json ./
RUN yarn install

COPY . .

EXPOSE 3001

CMD ["yarn", "start:dev"]