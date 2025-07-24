# Limiting CPU limits for containers

`docker run --help | grep cpu`

`--cpus=<decimal_value>`
- Allows designation of the number of CPUs the container is allowed to use.
- Will throtle the container when the limit is reached.
- Great for setting hard limits
Example:
`docker run -d --rm --name cpu_decimals --cpus=0.5 busybox sh -c "while true; do :; done"`
- `sh -c "while true; do :; done"`: quick, dirty way to use up cpu
- `docker stats` to view the process:
```
CONTAINER ID   NAME           CPU %     MEM USAGE / LIMIT   MEM %     NET I/O        BLOCK I/O    PIDS 
04a616e017bc   cpu_decimals   50.01%    780KiB / 7.653GiB   0.01%     1.7kB / 126B   152kB / 0B   1
```
    - the CPU % is hovering around 50% due to the `--cpus=0.5` limit we set.

`--cpu-shares=<value>`
- Way to set cpu limits when not  knowing the exact size; setting relative weights for the container
- Will only adhere to the `--cpu-shares` when resources are sparce.
- Remember that when containers are deployed (typically in a EC2 instance) they're in a VM that has limitations.
- `--cpu-shares=512` & `--cpu-shares=2048`
```
CONTAINER ID   NAME              CPU %     MEM USAGE / LIMIT   MEM %     NET I/O        BLOCK I/O   PIDS 
d90b9fc41060   cpu_shares_low    20.44%    632KiB / 7.653GiB   0.01%     872B / 126B    0B / 0B     1 
269b5ff3d83c   cpu_shares_high   79.64%    628KiB / 7.653GiB   0.01%     1.3kB / 126B   0B / 0B     1 
```
    - shows how the cpu weights given to each container is allocated

`--cpuset-cpus=0` : tells docker to run the container on the first cpu given to it 

`--cpu-period=<time_in_ms>`
- Default set to 10000 ms

`--cpu-quota=<num_of_period_to_allocate>`
- This is the hard cap time the container is allowed to use from the cpu-period. This is another hard cap like `--cpus=<value>`

`--cpus=0.5` == `--cpu-period=10000 --cpu-quota=5000`