FROM node:10-alpine
WORKDIR /app
COPY . .
RUN yarn --production --pure-lockfile
RUN yarn build-prod
EXPOSE 4000 4000 
