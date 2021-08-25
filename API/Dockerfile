FROM node:alpine

WORKDIR /usr/app

COPY package.json ./
RUN npm install -g yarn
RUN yarn

COPY . .

EXPOSE 3000

CMD ["npm", "dev"]