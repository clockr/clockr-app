# build environment
FROM node:20-alpine as build

WORKDIR /app

COPY ./ .

ENV PATH /app/node_modules/.bin:$PATH

RUN yarn install && unset CI && yarn build

# production environment
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# install nodejs & npm
RUN apk add --update nodejs
RUN apk add --update npm

# install runtime-env-cra package
RUN npm i -g runtime-env-cra

WORKDIR /usr/share/nginx/html

EXPOSE 80

CMD ["/bin/sh", "-c", "runtime-env-cra && nginx -g \"daemon off;\""]