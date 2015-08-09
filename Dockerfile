FROM node:0.10.38

RUN apt-get update -qq && apt-get install -y build-essential
RUN apt-get install -y ruby
RUN gem install sass

RUN mkdir /src

RUN npm install gulp -g

WORKDIR /src
ADD app/package.json /src/package.json
ADD app/config.js /src/config.js
RUN npm install --unsafe-perm=true

EXPOSE 49000
EXPOSE 49900

CMD ["npm", "start"]
