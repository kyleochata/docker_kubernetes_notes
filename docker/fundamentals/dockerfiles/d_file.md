# Dockerfile Fundamentals

Programatically define steps for the creation of Docker images

Docker files give you the power to create custom images that perfectly match your requirements.

## Advantages:
- **Reproducibility**:
    - Define all the steps necessary to build the Docker images, ensuring that anyone with the Dockerfile can recreate the exact same image
- **Automation**:
    - Dockerfiles automate the build process for your applications. Reducing the manual steps and human error risk
- **Transparency and Documentation**:
    - Dockerfiles should act as good documentation of how the image was built by providing clear overview of all the steps involved in building it.
- **Optimization**:
    - Dockerfiles provide full control over the build steps, able to tackle optimizations to improve security and speed up the build time and image size.