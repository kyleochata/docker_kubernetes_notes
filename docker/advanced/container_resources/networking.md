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