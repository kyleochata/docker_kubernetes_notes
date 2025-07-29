# Docker Compose CLI to manage Compose projects

`docker compose CMD`
- This will only affect containers that're managed by that directory's `compose.yaml`
- Good way to narrow down what containers are being affected by the current compose project

`docker compose ps`
- similar to `docker ps` but will only return services managed by the specific `compose.yaml` in that directory.
    - *Must be at the level of the `compose.yaml`*

`docker compose start <service_name>`
- starts the named service. Don't have to include the prefix that's added to the container!

`docker compose stop`
- Default is to stop everything managed by the compose if no service name is provided.

`docker compose down`
- Default is to only remove containers and networks
- `-v` is to also remove volumes
- `--remove-orphans`: sometimes names change in the `compose.yaml` for services. This will remove previously made containers with older names

`--help` is your best friend for everything in docker