FROM node:alpine

COPY package.json .

COPY  yarn.lock .

RUN yarn install

COPY . .


EXPOSE  8000

CMD  [ "yarn", "start" ]
