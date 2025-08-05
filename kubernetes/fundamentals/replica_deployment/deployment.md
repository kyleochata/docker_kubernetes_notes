# Deployment in K8

Manage and update apps at scale!

ReplicaSets offer a great way to ensure a pre-defined number of pods are running at any given time. However, they don't provide all the needed functionality for managing apps at scale

## Deployments offer a higher level of abstraction on top of ReplicaSets.
- Rolling Updates: 
    - Gradually replace old pods with new ones without downtime
    - Ensures app remains available
- Rollbacks: 
    - Revert to a previous version in case something goes wrong during an update
    - Crucial for maintaining app stability and recover quickly from errors
- Declarative updates of replicas over time
- History and revision control: 
    - Keep track of the history of all changes made, allows view and revert to previous versions
- Advanced Rollouts:
    - Limit risk by leveraging controlled rollouts of new versions
    - Ensures that updates are applied gradually and safely



Sample Deployment yaml file
```
apiVersion: apps/v1
kind: Deployment
metadata:
    name: nginx-deployment
    labels:
        app: nginx
spec:
    replicas: 3
    selector:
        matchLabels:
            app: nginx
    template:
        metadata:
            labels:
                app: nginx
        spec:
            containers: ...
    strategy:
        type: RollingUpdate
        rollingUpdate: ...
```

## Rolling Updates

`kubectl rollout <CMD>`

`kubectl rollout history <deployment_name>`
- Will show the revision count and change-cause for the named deployment

`kubectl undo deployment <deployment_name>`
- Will change a deployment back one version.
- The pods created will have their previous has as in the original version
- Revision count will still increase
    - 1 = OG image, 2 = new base imge, --> `kubectl undo ...` --> use revision 1 to create 3 -> 3 = image based on revision 1 (og image)


