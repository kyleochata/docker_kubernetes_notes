# Images vs Containers

`docker build -t <name>:<version>`

`docker run -d -p 3000:80 --name blue1 <name>:<version>`

`docker run -d -p 3001:80 --name blue2 <name>:<version>`

When a container gets built it will only be built with the assets and functionality of the image when the image was built. 
- if the image version 1 will only return hello world and is built into container blue1; even if we update the image to version 2 and it should return `boo hello`, the curl to `http://localhost:3000` will still only return `hello world`. This continues even if we do `docker stop blue1` and then `docker start blue1`. Since `blue1` was only build with version 1, it'll never return `boo hello` and only return `hello world`.
- We would need to completely remove the contianer and build a new `blue1` with the newest image version

**Images are the blueprint for containers. Containers are process built with certain images at that point in time**
 