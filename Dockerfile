# syntax = docker/dockerfile:experimental

# build stage
FROM node:12-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm -g update yarn
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn/v6 yarn install
COPY . .
RUN yarn build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
