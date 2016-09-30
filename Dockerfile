FROM node:argon
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app/
RUN npm run compiledep
EXPOSE 8443
CMD [ "npm", "start" ]