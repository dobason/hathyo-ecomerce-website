FROM node:18-alpine

ARG NODE_ENV=test
ENV NODE_ENV $NODE_ENV
RUN apk update && apk add --no-cache tzdata bash jq gettext util-linux curl 

WORKDIR /app/applications
ADD package.json yarn.lock ./
RUN yarn install
ADD . .
RUN yarn build
EXPOSE 3000

RUN echo "start application with ENV=$NODE_ENV"
CMD ["yarn", "start"]