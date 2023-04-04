FROM node

WORKDIR /app

COPY . .

ARG REACT_APP_API_URL=http://127.0.0.1:8000

RUN npm install && npm install -g serve

EXPOSE 3000
CMD npm run build && serve build
