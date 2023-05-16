FROM node:16.15-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]
