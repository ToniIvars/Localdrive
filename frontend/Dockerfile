FROM node

WORKDIR /app

COPY . .

RUN npm install && npm install -g serve
RUN npm run build

EXPOSE 3000
CMD ["serve", "build"]