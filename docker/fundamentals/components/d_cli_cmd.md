`docker images`
- view image cache

`docker --help`
- find help for commands in docker

`docker <cmd> --help`
- will list help information for specified docker cmd

`docker ps -a`
- view running processes
- `-a` include stopped/exited containers

`docker pull {image_name}`
- pulls a docker image from the image registry
- will pull the latest version of the image unless specified otherwise

`docker run {image_name}`
- builds and runs a container with the image specified

`docker start <cId>`
- will start up a previously exited container 

`docker stop <cId>`
 - stops a running contianer gracefully

`docker rm <cId> | <c_name>`
- removes unwanted containers
- container id or container name works

`docker ps -a | grep {c_name}`
- will list the container with the specified name

`docker ps --filter name=<c_name>`
 - filter allows for the same as grep just with more complex filtering configs

`docker ps -q`
- list the processes' `<cId>`
- `-q`, `--quiet`: only display task Ids

`docker stop $(docker ps -q)`
- `$(docker ps -q)` = shell cmd
- stops all the docker containers with the ids from the shell cmd

`docker rm $(docker ps -aq)`
- Removes all docker containers including the stopped ones as well.

`docker logs <cId> | <c_name>`
- View the logs of the specified container.

`docker logs -f <cId> | <c_name>`
- live view of the logs for specified container

`docker exec <cId>|<c_name>`
- executes a command inside of the specified container

ex for nginx:

`docker exec -it <c_name> /bin/bash`
- creates an accessible shell within the nginx container

`docker build`
- builds a container based on the Dockerfile.

DOCKERFILE (simple)
```
FROM ubuntu:latest
CMD ["echo", "hello from first docker image"]
``` 