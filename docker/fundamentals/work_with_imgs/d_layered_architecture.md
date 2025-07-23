 # Docker Layered Architecture

 `docker history <image_name>:<tag>`

 This will pull up the layered history of the image:
 
 - Each line corresponds to a new image or command that is being executed either from the base image or the dockerfile the image is building from.
 - Docker removes unneeded images during the build process 
 