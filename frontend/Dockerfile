FROM node

WORKDIR /app

COPY . .

ARG VITE_API_URL=http://127.0.0.1:8000

RUN yarn && yarn global add serve
RUN yarn build

EXPOSE 3000
CMD serve build
