FROM node:18-alpine
LABEL authors="daniildiveev"

WORKDIR /lab4-client/
COPY package.json /lab4-client/
COPY src /lab4-client/src
COPY public /lab4-client/public

RUN npm install

ENTRYPOINT ["npm", "start"]