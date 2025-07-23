# Docker Components

## What're the different parts of Docker-based systems?

Docker Client
- docker cli
- api calls

Docker Host
- REST API
- Docker Daemon: Docker engine responsible for managing all the containers
- Contianers 
- Image Cache: store all images used to make a container locally

Image Registry
- Hosts images (Docker Hub)
- Available for download and make containers based off of these images in the Docker Host

## Running a container from an image

1. Issue `docker run` in CLI
2. CLI sends a request to the host's REST API
3. Docker Host checks image cache to see if the desired image is there
4. If not, downloads it from the image registry
5. Docker Host instantiates a new container based on the image.

## Building and pushing an image
1. Issue `docker build` to CLI
2. CLI sends the req tothe host's REST API
    a. This also includes the respective Dockerfile and context
3. Docker Host build the image according to the Dockerfile
    a. Handled by the Docker Daemon
4. Docker Host tags the image and is stored locally
5. Issue `docker push` to CLI
    a. Uploads the local image to the Image Registry