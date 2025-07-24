# Managing Docker Volumes through the CLI

`docker volume create <volume_name>`
- Create new named volumes.

`docker volume ls`
- List all created volumes and their driver
- Optional flags for list:
    - `-f <string>` : filter flag 
        - ex: `-f --name=<vol_name>`
        - `f dangling=true`: returns volumes that aren't mounted to any containers
    - `-q`: quietly return all volume names only

`docker volume inspect <volume_name>`
- More indepth information about the volume
```
[
    {
        "CreatedAt": "2025-07-24T08:02:48Z",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/test1/_data",
        "Name": "test1",
        "Options": null,
        "Scope": "local"
    }
]
```
**Note that the "Mountpoint" path can change based on operating system**

`docker volume rm <container_name>`
- Remove volume. If the volume is mounted to a container(s), then the container(s) must be removed before volume can be removed. (removed not stopped)
- Removed all dangling volumes (volumes not in use):
    - `docker volume rm $(docker volume ls -f dangling=true -q)`

