FROM node:22-alpine3.20

ARG NODE_ENV

WORKDIR /app
COPY . .
COPY ./apps/users/.env.* ./
COPY ./apps/users/.env.example ./.env

RUN npm install

ENV NODE_ENV=$NODE_ENV
