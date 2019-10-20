# build stage
FROM node:12-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm -g install yarn
RUN yarn install
COPY . .
RUN yarn build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
