FROM node:argon
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
RUN npm install -g forever
COPY . /usr/src/app/
RUN npm run compiledep
EXPOSE 8443
EXPOSE 80
CMD [ "npm", "run", "deploy" ]