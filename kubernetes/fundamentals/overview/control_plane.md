# Control Plane: Master Node
The brains of Kubernetes

## API Server
- Exposes the Kubernetes API: main entry point for all administrative tasks
- want to update pods, maintain pods

## Scheduler 
- Responsible for placing pods on the most suitable nodes
- Selects worker nodes (data plane) based on resource availability and other constraints
- 

## Controller Manager
- Responsible for running controller processes that handle routine tasks
- ReplicaSet controller, node controller, job controller etc.
    - node controller: makes sure nodes are healthy, registered and communicating correctly with kubernetes
    - ReplicaSet controller: ensures the correct number of replica pods deployed
        - ReplicaSet = k8 object that specifies how many replica pods we want

## Etcd
- Single source of truth for the kubernetes cluster's state
- Distributed key-value store that stores all cluster data
    - Config & state of cluster
- API server is used to ReadWrite from the Etcd store whenever there's a need to read-write the cluster's state

## Cloud Controller Manager
- enables k8 to interact with the underlying cloud infrastructure
- handles tasks such as:
    - managing cloud-based load balancers
    - persistent storage
    - node management