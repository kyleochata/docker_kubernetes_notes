1. Run a container based on NGINX container with tag 1.27.0
2. Get an interactive shell within the container
3. Install the text editor vim
4. Modify the index.html from NGINX server to deliver custom content

1. Get container with NGINX

`docker pull nginx:1.27.0`
`docker run -d -p 80:80 --name web_server nginx:1.27.0`
- If we don't specify `nginx:1.27.0`, docker will assume latest and go and pull latest image

2. Interactive shell within the container 

`docker exec -it web_server /bin/bash`
 `docker exec -it web_server sh` 

 both will give a executable shell. Bash and sh are available in standard Debian nginx. sh only for Alpine nginx unless bash downloaded.

 3. Install vim

 `apt-get update`
 `apt-get -y install vim`
`vim` to open

 4. Edit html file

 `vim /usr/share/nginx/html/index.html`
 - Opens up vim with the index.hmtl. Needs the full file path


## Wrap up
Executing commands inside containers is good, but manually has a lot of limitations with scalability. There's a lot of room for error. All changes made within the container are lost forever if the container ever disappears: storage of the individual containers are "ephemeral" . Commands we run can be forgotten. 

--> Great reason for a DOCKERFILE!

## From the Dockerfile
`docker build -t <name_of_image> .`
`docker images` : find the `<name_of_image>`
`docker run <name_of_image>`
`docker exect -it <name_of_container> | <cId> sh`: open up our shell within the running nginx container

### Part 2: Adding local files to Docker Image (nginx example)

`docker run -d -p 80:80 web_server_image`


### Cleanup
`docker stop <cId> | <container_name>`
`docker rm $(docker ps -aq)`: clean ps cache
`docker rmi $(docker images -q)` : clean image cache; run after `docker rm`
