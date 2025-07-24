# Bind Mounts

[Dockerfile for bind mounts](./projects/bind_mounts/dockerfile)

Normally the docker container doesn't allow for hot-reloading as we have a nginx serving the static assets

To allow for hot reloading, add a Bind Mount

`docker run --rm -d -p 3000:3000 -v ./public:/app/public -v ./src:/app/src <img_name>:<img_tag>`

- `-v` flag is for passing a volume argument to the `docker run` command.
- `-v <local_path>:<container_workdir>/<container_path>`
    - after the volume flag signal the local path to the directory to the contianer's path to directory
    - By doing this after an image has been built previously, it will reflect the changes made locally without having to rebuild the image!
    - This only works because of the `CMD ["npm", "start"]` that supports hot realoading (react-app)
    - Doesn't retrigger a `docker build` command, but tells docker to look at the directories locally.
    - When the container looks at the `/app/public` directory, it's really just looking into the `./public` directory locally 