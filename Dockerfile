FROM node
RUN npm install -g nodemon
WORKDIR /app
RUN npm install express mongodb
EXPOSE 3000
