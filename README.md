# Loaker

Loaker is a password manager based on blockchain technology. It is a decentralized, open-source, and free. Dont' hesitate to visit our website : ![Loaker](https://loaker.fr)

## Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.astro
|   |   ├── Comparator.astro
|   |   ├── Footer.astro
|   |   └── Roadmap.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   └── pages/
│       ├── index.astro
|       ├── roadmap.astro
|       ├── team.astro
|       ├── pricing.astro
|       └── extension.astro
└── package.json
```

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3000`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |



## Prerequisites to run locally
- [Deno](https://deno.land/)
You can install Deno in linux using the following command:
```bash
curl -fsSL https://deno.land/x/install/install.sh | sh
```

## Command Line Interface

### For development purposes
⚠️Commands for the frontend must be run from the root directory. Commands for the backend must be run from the server directory.⚠️
Install dependencies
```bash
yarn
```
or
```bash
npm install
```

⚠️You must build the frontend before running the server. To build the frontend, use the following command (must be in the client directory):⚠️
```bash
yarn build
```
Run the app from the server directory
```bash
deno run --allow-net --allow-read server.ts
```
or with all permissions (not recommended in production)
```bash
deno run -A server.ts
```

To run the frontend in localhost mode, use the following command (must be in the client directory):
```bash
yarn dev
```
or
```bash
npm run dev
```

### Make the docker image with the dockerfile
0. Run `yarn build` in the root directory to build the frontend
1. Add the files `cert.pem` and `key.pem ` in `/server/` before building the image
2. Make sure that `Deno.serve({ port: 8080 }, handlerHttp);` is commented and `Deno.serve({port: 443,cert: Deno.readTextFileSync("cert.pem"),key: Deno.readTextFileSync("./key.pem"),}, handlerHttp);` is uncommented in `/server/server.ts`
3. Build the image
```bash
sudo docker build -t loakerwebsite .
```

### Push the docker image to docker hub
1. Login to docker hub
```bash
sudo docker login
```
2. Tag the image
```bash
sudo docker tag loakerWebsite jbcol602/loakerWebsite:latest
```
3. Push the image
```bash
sudo docker push jbcol602/loakerWebsite:latest
```

### Run the docker image phishing app on the server (docker must be installed)
pull the image from docker hub
```bash
docker pull jbcol602/loakerWebsite:latest
```
if you want to remove all the images already on the machine
```bash
docker rmi $(docker images -q) -f
```
launch the image
```bash
docker run -d -p 443:443 jbcol602/loakerWebsite
```

## Some useful docker commands
list running containers
```bash
docker ps
```
list all containers (running and killed)
```bash
docker ps -a
```
stop a container
```bash
docker stop <container_id>
```
remove a container
```bash
docker rm <container_id>
```
remove all containers
```bash
docker rm $(docker ps -a -q) -f
```
list all images
```bash
docker images
```
remove an image
```bash
docker rmi <image_id>
```
remove all images
```bash
docker rmi $(docker images -q) -f
```

