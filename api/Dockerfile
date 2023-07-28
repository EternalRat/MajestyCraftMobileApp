# pull the Node.js Docker image
FROM node:18-alpine

# create the directory inside the container
WORKDIR /usr/src/app

# copy the package.json files from local machine to the workdir in container
COPY package.json ./
COPY yarn.lock .

# run npm install in our local machine
RUN yarn

# copy the generated modules and all other files to the container
COPY . .

RUN yarn build

EXPOSE 8080

# the command that starts our app
CMD ["yarn", "start"]