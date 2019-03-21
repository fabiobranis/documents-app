# build stage
FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# If you are building your code for production
# RUN npm ci --only=production
RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]
# production stage
#FROM nginx:stable-alpine as production-stage
#COPY --from=build-stage /app/build /usr/share/nginx/html
#EXPOSE 80
#CMD ["npm", "start"]