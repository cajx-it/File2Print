FROM node:25.8.1
WORKDIR /usr/local/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
RUN useradd app
USER app
CMD [ "node", "node.js" ]