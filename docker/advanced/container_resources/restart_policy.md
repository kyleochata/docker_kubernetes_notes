# Container restart policies

`docker run --restart on-failure`
- Restarts the constructed container anything other than `exit(0)`
- `docker inspect <img>` then find `"RestartCount"` property. This will list how many time s the container has been restarted.

`--restart on-failure:<num_retry(s)>`
- To specify how many times the Docker Daemon should try to restart the container.

`--restart always`: will try to restart the container no matter how it exits, including `exit(0)`
- if we `docker stop` a restart always container, docker will stop it and listen to the manual input over the restart policy
- will try to restart if the Docker Daemon is restarted

`--restart unless-stopped`
- if `docker stop` is issued on this command, then the container will never try to restart.
- If Docker Daemon is restarted when this container is stopped, container will not try to restart.