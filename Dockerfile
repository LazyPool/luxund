FROM node
WORKDIR /app
COPY ./app .
RUN npm install express mongodb
EXPOSE 3000
CMD ["node", "index.js"]
