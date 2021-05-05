FROM node:12.6
WORKDIR "/usr/src/"
RUN apt update && apt install dh-autoreconf -y
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --silent
ENV PATH /usr/src/node_modules/.bin:$PATH
COPY [".", "./app"]
WORKDIR /usr/src/app
CMD npm run dev