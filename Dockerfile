FROM node:20.17.0-alpine

WORKDIR /usr/src/app


ARG NEXT_PUBLIC_API_URL

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

COPY . .

RUN yarn install 

RUN yarn build
EXPOSE 8080
CMD ["yarn", "start"]
