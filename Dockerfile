FROM node:22-alpine3.20

ARG NODE_ENV

WORKDIR /app
COPY . .
COPY ./apps/users/.env.* ./
COPY ./apps/users/.env.example ./.env

ENV NX_CLOUD_DISABLED=true
RUN npm install --unsafe-perm --ignore-scripts

ENV NODE_ENV=$NODE_ENV
