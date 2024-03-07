FROM node:18-alpine as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN rm .env 

FROM node:18-alpine as production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3000
 
CMD [ "node","dist/main.js" ]