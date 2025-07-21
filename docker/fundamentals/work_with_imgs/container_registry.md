# Container Registries
Storing and managing Docker images

Container registries offer a multitude of benefits:
1. *Collaboration*: Share images with teammates, clients or wider community
2. *Versioning*: Track different versions of your images for easy rollback and updates.
3. *Security*: Private registries provide secure environments for storing sensitive images
4. *Automation*: Automate image building and deployment as part of CI/CD pipeline

## Exploring Docker Hub
 Important to signal the version tag of an image. When using the `latest` tag, it will update and point to new images as the images gets updated creating issues. Best practice to pick a tag and reference it in `docker pull` rather than rely on latest

 ## Docker CLI login

 `docker login -u <docker_username>`
 Once prompted -> paste in a personal access token that's generated on the Docker website (security)

 ## Image tagging

 `lts` - long-term support 
`--all-tags` - flag to download all tags for a image 

`docker build -t <image_name> .`
- This will build the `image_name` with the tag of latest

`docker tag <image_name>:latest <username>/<image_name>:<tag_version>`
- `<username>/<image_name>:<tag_version>` is needed to push the image to Docker Hub. Just put `docker push` in front of it
