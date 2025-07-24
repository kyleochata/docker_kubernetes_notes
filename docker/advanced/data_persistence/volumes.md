# Docker Volumes

Docker will persist changes made inside of the container through restarts of the container

If the container is ever removed then rebuilt, the changes are gone due to the containers being ephemeral (data only lives as long as container lives; stopped-state ok)


## Volumes - persist data beyond the container's lifecycle

Volumes act as managing directories or files, separate from the container's file system, ensuring data remains safe and accessible.

Benefits to Volumes:
1. Data Persistence - data remains even if container stops or is removed
2. Data Sharing - share data b/w multiple containers by sharing the same volume.
3. Backup and Recovery - Easily back up and restore valuable data
4. Decoupling Data from Containers - Flexibiliity in managing and deploying containers by separating data from application runtime

Types of Docker volumes:
A. Bind Mounts
    - Directly link host system directoreis or files to container
    - Uses: ideal for real-time dev updates
B. Named Volumes
    - Created by the user and reusable across containers 
    - Uses: Best match for perfect persistent data
C. Anonymous Volumes
    - Automatically created without a name that enables reusability
    - Not often used
    - Tempory data that doesn't need to persist
