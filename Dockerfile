# build environment
FROM node:20-alpine as build

WORKDIR /app

COPY ./ .

ENV PATH /app/node_modules/.bin:$PATH

RUN yarn install && unset CI && yarn build

# production environment
FROM nginx:bookworm

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY .env.prod.j2 /usr/share/nginx/html/.env.prod.j2

# Install curl and other necessary build tools
RUN apt-get update && apt-get install -y curl gnupg build-essential

# Add the NodeSource package signing key
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | gpg --dearmor -o /usr/share/keyrings/nodesource-archive-keyring.gpg

# Add the NodeSource repository for Node.js 20
RUN echo "deb [signed-by=/usr/share/keyrings/nodesource-archive-keyring.gpg] https://deb.nodesource.com/node_20.x bookworm main" | tee /etc/apt/sources.list.d/nodesource.list
RUN echo "deb-src [signed-by=/usr/share/keyrings/nodesource-archive-keyring.gpg] https://deb.nodesource.com/node_20.x bookworm main" | tee -a /etc/apt/sources.list.d/nodesource.list

# Update apt-get and install Node.js (includes npm)
RUN apt-get update && apt-get install -y nodejs j2cli

# Verify the installation of Node.js and npm
RUN node --version
RUN npm --version

# install runtime-env-cra package
RUN npm i -g runtime-env-cra

WORKDIR /usr/share/nginx/html

EXPOSE 80

CMD ["/bin/sh", "-c", "j2 .env.prod.j2 > .env && runtime-env-cra && nginx -g \"daemon off;\""]