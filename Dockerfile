FROM node:alpine

RUN apk add --no-cache git # Add this line to install git

RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app

WORKDIR /usr/src/node-app

COPY package.json yarn.lock ./

USER node

RUN yarn install --pure-lockfile

# Initialize git and install husky hooks
RUN git init && \
    npx husky install

COPY --chown=node:node . .

EXPOSE 3000
