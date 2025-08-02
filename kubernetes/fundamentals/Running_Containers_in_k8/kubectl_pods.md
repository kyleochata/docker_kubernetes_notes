# Kubectl for running pods

Kubectl takes CLI commands and translates it into API instructions to be sent to a k8 cluster 

`kubectl config current-context`
- Check what k8 cluster kubectl is currently talking to

`kubectl confit set-context <cluster_name>`
- change the cluster kubectl is communicating with

`kubectl run <pod> --image=<image_name>:<image_tag>`
- Create pods with `kubectl run`
- Ex:
    - `kubectl run -it alpine --image=alpine:3.20 sh` : spins up a pod that is a single alpine container and allows us to get a shell open
        - `apk --update add curl`
        - able to curl to other pods running in k8 by IP Address. Anything outside of K8 won't be able to communicate with the pod due to the IP being private. By default pod names won't work. 

`kubectl get pods`
- Check what pods are running

`kubectl describe <resource> <name>`
- `<resource>`: the type of object we are looking at 
    - pod, service, node
- `<name>`: name attached to resource
- `kubectl describe pod nginx`
- gives much more indepth inofrmation than `kubectl get pods`

`kubectl delete <resource> <name>`
- `kubectl delete pod alpine`
- `kubectl delete service nginx`

`kubectl expose pod <name_of_pod> --type=NodePort --port=80`
- Expose a pod or set of pods through a `Service`
- This is better for connectivity due to when a pod stops and restarts or is redeployed the IP address is bound to change
- Easier to connect via a named `Service` through `kubectl expose`
- Once a pod is exposed into a `Service`, then it will allow for other pods to communicate with the `Service` via `Cluster-IP` or the `Service` name
- `NodePort`: Primarily used for exposure of Service to external traffic (outside of cluster)

`kubectl get service`
- Retrieve the list of services
- Services have a `CLUSTER-IP` that allows for communication to the service within the cluster
    - Stable between pod restarts

