# Docker `compose.yaml`

`docker-compose up` or `docker compose up`
- Both will work to read the `compose.yaml` file. 
- `docker compose` is the pluggin for docker while `docker-compose` is the standalone version.
    - Functionality is the same between the two

## `compose.yaml`
[example](../projects/compose_lab/compose.yaml)
```
services:
    service1:
        image: <image_name>:<image_tag>
        [options]:
```

- Without any specifications in the `compose.yaml`, the `docker compose up` will create default networks and containers based off the services defined.
### Services
These will be the containers that're created by the docker compose.
Require a base image:tag and will take various options to configure the container

#### Local Images for Services
```
    backend:
        build:
            context: backend
            dockerfile: dockerfile.dev  # if not using standard dockerfile
        ports:
            - 3000:3000
        env_file:
            - .env.db-key-value
```
- When running `docker compose up` ensure that the `--build` flag is passed as well so docker will run the build command before starting the backend services

#### env variables
Underneath services and the container:
```
    environment:
        - variable=value
```
Best practice:
- Store env variables within a .env file and then use 
`env_file:` property in the `compose.yaml`

### Bind Mounts
```
volumes:
    - "path_of_host_file:path_of_target_file"   # Similar to docker run -v
    # alternative and better
    - type: <bind | volume>
      source: <local_path_to_files>
      target: <path_in_container>  
```

## Volumes & Networks
Named volumes are their own section outside of services (compared to bind-mounts).
    - named volumes are for data persistence, bind-mounts are to get files locally into the container for live editing.

In order for these named volume(s) & network(s) to be used, must add a `volumes` & `networks` property to the named service to attach them.
    - For volumes it's the same as bind-mounts, with the `type: volume`
    - for networks:
        - `networks:\n\t- network_name`
    - **If the networks or volumes in the `compose.yaml` aren't used, they will not be created in the `docker compose up`**
    - there will be a prefix of the directory name where the `compose.yaml` file is located attached to the created volumes & networks.
        - by adding `name:<value>` to the top of the `compose.yaml` it will set the prefix for everything created by the `compose.yaml`

## Service Dependencies: `depends_on:`
If a certain service depends on another service, ideally we would like the first service to not be started or created until it's dependent service is up and running. the `depends_on:` property for that service is how we can ensure the first service's container won't be created until after the second service's container.
    - This still doesn't ensure health or functionality of service B before A tries to connect to it.
    - Explored more with `condition:service_healthy` in `depends_on:` or `wait-for-it` or `dockerize`

### Hot Reloading & File Watching
```
    develop:
        watch:
            - action: sync
              path: ./backend/src
              target: /app/src
            # path: ./backend
            # target: /app
            # ignore: node_modules
```
To add hot reloading and file watching to a compose file, find the service that supports it and use the `develop: watch:` properties.
    - Both are acceptable ways if you want to be specific about what dirs you want to watch or if you want to watch a large chunk but ignore certain files/dirs
In order for it to work, need `docker compose up --watch`

