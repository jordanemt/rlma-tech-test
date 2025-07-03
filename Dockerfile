FROM node:22-alpine
WORKDIR /app

COPY . .
RUN yarn install

EXPOSE 3000
EXPOSE 5173

CMD ["yarn", "dev"]
