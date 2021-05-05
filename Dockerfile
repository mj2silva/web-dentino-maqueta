# Construcción del dist para producción
FROM node:12.6.0 as builder
WORKDIR "/usr/src/"
RUN apt update && apt install dh-autoreconf -y
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --silent
ENV PATH /usr/src/node_modules/.bin:$PATH
COPY [".", "./app"]
WORKDIR /usr/src/app
RUN npm run build

# Servidor nginx donde corre el dist
FROM nginx:1.19.1
COPY --from=builder /usr/src/app/src/dist /usr/share/nginx/html