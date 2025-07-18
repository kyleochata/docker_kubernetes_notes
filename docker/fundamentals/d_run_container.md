# Running Docker Containers (nginx)

`docker pull nginx`

`docker run nginx` - will not close out since web server

In separate tab `docker ps` to view the processes running
    - will see a random namee attached to the processes that are running 
    - able to target the container with the name in docker commands

`docker run -d nginx`: 
    - `-d` flag will run nginx in a detached mode to free up the terminal

`docker kill {container_name}`
    - shutdown container that's running 

`docker run -d -p 8080:80 --name web-server nginx`:
    - `-d` = detached mode
    - `-p 8080:80` - maps the http request to 8080 to container port 80; will hit the nginx endpoint when 8080 is called
    - `--name {name}`- allows to alias the containers name

`docker ps`:
    - should see that nginx is up and running with the name `web-server` 
    - Ports col:
        `0.0.0.0:8080->80/tcp`
        - The port mapping of port 8080 to the container port of 80 over tcp
        - running nginx inside container on port 80
        - docker is exposing that port 80 to the host on port 8080
        - user calls localhost:8080 and then docker routes that traffic to the container's internal port 80

`curl http://localhost:8080` to confirm it's up and running

`docker stop {name}` is a more graceful shutdown than that of `docker kill {name}`