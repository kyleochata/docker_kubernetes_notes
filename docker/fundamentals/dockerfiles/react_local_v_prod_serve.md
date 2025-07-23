# React applications local vs production serving.

When using react, there's hot reloading that will rebuild assets as changes are made locally.
- `create-react-app` uses `WebPackServer`

`WebPackServer` is servicable for local development, but can and should be dealt with in containers

`npm run build` to create a production ready app

Once build is complete, serve the package with a http server.
```
npx http-server@14.1.1 build
Need to install the following packages:
http-server@14.1.1
Ok to proceed? (y) y

Starting up http-server, serving build

http-server version: 14.1.1

http-server settings: 
CORS: disabled
Cache: 3600 seconds
Connection Timeout: 120 seconds
Directory Listings: visible
AutoIndex: visible
Serve GZIP Files: false
Serve Brotli Files: false
Default File Extension: none

Available on:
  http://127.0.0.1:8080
  http://192.168.1.20:8080
Hit CTRL-C to stop the server
```
By doing it this way, there's no hot reloading as seen in the `npm run start` workflow. The build workflow is just to serve static files and create the `http-server` to serve those static files.
- Static files are determined by the files present / copiled during `npm run build`.

## Image Size using `create-react-app` vs `nginx`
[Dockerfile](../projects/continerized-react-app/dockerfile)

```
REPOSITORY   TAG       IMAGE ID       CREATED          SIZE
reactapp     default   629153e9f8fc   11 seconds ago   761MB
reactapp     nginx     b56e7000732a   2 minutes ago    277MB
```

Default is omitting the second part of the docker file where the static files are served via nginx.
- By serving it via nginx rather than the default `webpackserver` we have drastically reduced image size. 