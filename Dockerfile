# Run the app using NodeJS
FROM node:23-alpine
WORKDIR /app

COPY . ./
RUN npm install

EXPOSE 80
CMD ["node", "src/main.js"]