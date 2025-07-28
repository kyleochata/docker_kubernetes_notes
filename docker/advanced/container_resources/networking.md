# Docker networking

Leveraging Docker's networking capabilities to isolate and connect containers

Docker networking == infrastructure to make inter-containers and external communication possible, while maintaining the security and isolation benefits of containers
1. Containers inDocker network receive an unique IP address
    - Address allows other containers on the same network to communicate with it
2. Assign names to containers and us them as aliases
    - Best practice since IP addresses can change on container recreation, while names are stable
3. Containers in bridge networks can be made reachable from the host network by exposing ports.
    - Containers without names are put in the bridge network
4. Containers can be apart of multiple networks and will recieve a unique IP address per network

## Main Network Drivers
1. Bridge (Default)
- Creates a private network on the host machine where your containers can communicate with each other
- Suitable for most single-host scenarios

2. Host
- Removes netowrk isolation between the container and the host
    - Able to reach the localhost address without port exposure int the bridge
- Maximum performance when strict isolation isn't required

3. None
- Disables all networking for a container
- Helpful for specific isolation requirements

4. Overlay
- Designed for multi-host networking allowing containers on different hosts to communicate directly
- Essential for creating swarm clusters or distributed applications
- Will appear as physical devices in the network

## Bridge Network
Default network from docker 

`docker network inspect bridge`
- View the container's IP address inside of the network
- Unable to connect to the container by name
    - Auto-service discovery (DNS Resolution) offered by Docker is only available in useer defined networks  

### Connect to container via IP
`docker run -it ubuntu:24.04 sh`
```
apt update && apt upgrade
apt install curl
curl <bridge_IP_Address>
```

- This allows for any container within the bridge network to be communicated with.
- Unable to connect via name of the container due to being on a bridge network


## User Defined Network
User defined networks are preferred due to the fact that container IP Addresses can change when they are recreated. User defined networks allow for connection to the container via name making it more user-friendly.

```
docker network CMD

connect         Connect a container to a network
create          Create a network
disconnect      Disconnect a container from a network
inspect         display detailed info of network
ls              List networks
prune           Remove all unused networks
rm              Remove one or more networks
```

`docker network create <net_name>`

`docker network connect <network_name> <container_name>`
- Will need to run `docker network inspect <network_name>` to visually confirm connection
- `docker inspect <container_name>` will also give info on network the container is connected to 
    - `"DNSNames":` are all the names within the user defined network that will be able to allow for connection to the container. (must use IP for bridge networks)
```
"Config": [
    {
        "Subnet": "172.18.0.0/16",
        "Gateway": "172.18.0.1"
    }
]
```
- The first 2 values of the `"Subnet"` are reserved and line up with the networks IP.
- Last 2 values before the `/` are what changes for the containers added
-`/16`: is the CIDR notation for the subnet mask. Locks the first 2 values `172.18` as the network prefix. 
    - First 16 bits are the network portion and the final 16 for the host address
- `"Gateway"`: is the entrypoint to the network and is reserved

`docker run -it --network <network_name> alpine:3.20 sh`
```
apk add curl        #download curl to alpine
curl <container_name>
```
- Connect the new container to the user-defined network and we are able to `curl` to the previously connected containers by their name rather than their specific IP Address within the network
    - Only works for named networks

## Host Network
Removes the isolation between the Docker host and the containers running

`docker run --network host <img_name>:<img_tag>`