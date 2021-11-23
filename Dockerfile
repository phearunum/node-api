FROM node:v16.13.0
WORKDIR /app
ADD ./app
RUN npm install
EXPOSE 2000
CMD npm start