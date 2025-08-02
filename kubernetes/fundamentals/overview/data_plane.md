# Data Plane: Worker Nodes
Where containers are actually running

## Kubelet
- Agent that runs on each worker node and communicates with the controller plane
- Ensures that containers are running in the pods as defined by the pod specifications

## Container Runtime
- Responsible for running the containers on each worker node.
- K8 supports: Docker, containerd, or CRI-O

## Kube-porxy
- Manages network rules on each worker node
- Maintains network connectivity and load balancing for services
- Ensures that requests are routed to the apporpriate pods

## Services vs Kube-Proxy
- Services are a k8 object that acts as a stable access point to a worker node (IP Address to communicate with the node)
- Kube-Proxy is inside of the worker node that handles routing to the pods based on load and user-request

## Other K8 Objects: Not required
- ReplicaSets
- Deployments
- Jobs
- Services
- StatefulSets 