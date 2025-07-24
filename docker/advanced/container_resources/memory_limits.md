# Setting Memory Limits for Containers

`-m` | `--memory <bytes>`
- Sets the memory limit
ex:
`docker run -d --rm --name mongodb mongodb/mongodb-community-server:7.0-ubuntu2204`
`docker stats` output:
```
CONTAINER ID   NAME      CPU %     MEM USAGE / LIMIT     MEM %     NET I/O        BLOCK I/O       PIDS 
ad8bbd6fbca0   mongodb   0.56%     83.94MiB / 7.653GiB   1.07%     1.7kB / 126B   152kB / 201kB   34 
```
- Max memory for the mongodb contaienr is 7.6 GiB
- Change the memory:
`docker run -d --rm --name mongodb_lowmem --memory="20m" mongodb/mongodb-community-server:7.0-ubuntu2204`
    - The container wont show up in `docker ps -a` due to such low memory. The process is immediately killed due to low mem and removed (`--rm`)
    - `docker inspect mongodb_lowmem`: will lead to a `"OOMKilled": true,` meaning that the container was killed to prevent memory leaks

`--memory-reservation="<bytes>"`
- Memory soft limits, will allow for usage up to `--memory` limit if the container exceeds the reservation limit

`--memory-swap <bytes>`
- Swap limit equal to memory plus swap: '-1' to enable
- memory-swap is the total amount of memory the container s ever allowed to use before OOM kill.
- if `--memory-swap` == `--memory` then there's no overflow insurance and will be killed when container reaches `--memory` value.

`--memory-swappiness <int>`
- Tune container memory swappiness (0-100) (default: 1)

