FROM node:18-alpine 

WORKDIR /usr/src/app
COPY ["package.json", "./"]
COPY . .

RUN npm install --production && npm run build
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "run", "start"]