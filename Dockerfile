FROM node:18.16.0-alpine3.17
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY HackatonFinal/package.json HackatonFinal/package-lock.json ./
RUN npm install

COPY HackatonFinal/ ./

EXPOSE 4000

CMD ["npm","start"]