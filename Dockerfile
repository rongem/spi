FROM node AS build
WORKDIR /usr/app

COPY ./package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build:prod

FROM nginx
WORKDIR /usr/app
COPY --from=build /usr/app/dist/spi /usr/share/nginx/html/
