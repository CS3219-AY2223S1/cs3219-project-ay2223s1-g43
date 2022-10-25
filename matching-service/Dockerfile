FROM node:bullseye-slim
WORKDIR /src/app
COPY package.json .
RUN npm i
COPY . .
CMD ["node", "index.js"]
EXPOSE 8001