# Services

Abstract pod details to facilitate connectivity

Services allow us to expose, through a stable IP or internal DNS name a network application that is running as one or more Pods in your cluster
- Frontend will just communicate with the service and the service will handle routing to the various pods.
- Pods are ephemeral and the internal IP address is expected to change over the lifecycle of the pod (restarts, rollouts, etc.)

* Name of a svc is more stable than it's IP; IP changes if svc is ever deleted and reupped*

Default type === ClusterIP

`kubeclt get svc`
- View all services in cluster

```
apiVersion: v1
kind: Service
metadata:
    name: api-nodeport
spec:
    type: NodePort
    selector: 
        app: api-backend
    ports:
        - protocol: TCP
          port: 80
          targetPort: 80
          nodePort: 30007
```

## Cluster IP
Exposes the service on an internal, stable cluster IP
Only accessible within the cluster
When to use:
- Internal communication b/w microservices within the cluster
- Often combined with ingress to expose applications via HTTP and HTTPS



## NodePort
Exposes theservice on each Node's IPat a static port
If not specified, picks a port from 30000 - 32767
Accessible from outside the cluster using `<NodeIP>:<NodePort>`
When to use:
- Useful for exposing a service externally without a load balancer
- Often for development or testing

***Very insecure. We don't want to expose our pods externally via NodePort. There are better solutions.***
- ***Ideally we want to keep our pods communication internally and secured***

You can communicate with the NodePorts underlying pods via:
- Svc name
- Cluster IP
- NodePort
    - Linux:
        1. kubectl get nodes -o wide
            a. Find `INTERNAL-IP` address (how the VM or local machine communicates within itself. Not valid for outside VM to use)
        2. `curl <INTERNAL-IP>:<NODEPORT_fromYaml>`
    - Mac/Windows: that curl won't work.
        1. need to do `minikube service <nodeport_svc_name> --url`
        2. Take the output then paste it into the browser (port in the url output will be different from the yaml file)
            - minikube maps the localhost port to the nodeport's exposed port
            - Browser is outside of the k8/minikube cluster! Allows our communication from external to internal pods!
            *Keep the terminal open after minikube service cmd otherwise it won't work*

## LoadBalancer
Exposes service externally using a cloud provider's load balancer
Provides a single external IP to reach the service
When to use:
- Ideal for production environments where externalacess with load balancing is required.

## ExternalName
Maps the service to an external DNS name, redirecting traffic to a service outside the cluster
When to use:
- Allow services within the cluster to access services via a DNS name