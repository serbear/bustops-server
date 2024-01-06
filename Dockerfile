FROM node:21.5-alpine
LABEL authors="Sergei Markov"

#ENTRYPOINT ["top", "-b"]

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

CMD npm start