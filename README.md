# Web Dentino

Repositorio de código de maquetado del mockup del sitio web de dentino

## Uso

1. Puedes usar la aplicación directamente usando el contenedor de desarrollo.

```bash
$ docker build --tag numeral-front-server -f dev.Dockerfile .
```

```bash
$ docker run --rm -p 3000:3000 -it -v ${pwd}:/usr/src/app numeral-front-server
```

2. También puedes usarlo de manera más simple con docker-compose

```bash
docker-compose -f docker-compose.dev.yml up --build
```

3. Si no tienes docker instalado, puedes usar npm

```bash
npm install
```

```bash
npm run dev
```

El servidor utiliza por defecto el puerto 3000

Si el navegador no se abre automáticamente, ingresa manualmente en tu navegador a `localhost:3000`
