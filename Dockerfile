FROM node
RUN npm install -g nodemon
WORKDIR /app
RUN npm install express mongodb cors body-parser
EXPOSE 3000
