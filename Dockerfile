FROM node
RUN npm install -g nodemon
WORKDIR /app
RUN npm install express mongodb cors
EXPOSE 3000
