# Container Registries
Storing and managing Docker images

Container registries offer a multitude of benefits:
1. *Collaboration*: Share images with teammates, clients or wider community
2. *Versioning*: Track different versions of your images for easy rollback and updates.
3. *Security*: Private registries provide secure environments for storing sensitive images
4. *Automation*: Automate image building and deployment as part of CI/CD pipeline

## Exploring Docker Hub
 Important to signal the version tag of an image. When using the `latest` tag, it will update and point to new images as the images gets updated creating issues. Best practice to pick a tag and reference it in `docker pull` rather than rely on latest
 