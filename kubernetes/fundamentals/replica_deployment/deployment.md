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
    annotations:
        "kubernetes.io/change-cause":"updated template img"
            
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

## Deployment CMDs
`kubectl get deployments`
- View all deploymnents in the cluster.

`kubectl get deployment <name> -o yaml`
- Get more detailed information in yaml format

`kubectl describe deployment <name>`

`kubectl get pods -l <label_name>=<value>`
- see if all pods of a label are running

## Rolling Updates

`kubectl rollout <CMD>`

`kubectl rollout history <deployment_name>`
- Will show the revision count and change-cause for the named deployment
- Change-cause can be set with the `metadata.annotations."kubernetes.io/change-cause":"<msg>"`


`kubectl undo deployment <deployment_name>`
- Will change a deployment back one version.
- The pods created will have their previous has as in the original version
- Revision count will still increase
    - 1 = OG image, 2 = new base imge, --> `kubectl undo ...` --> use revision 1 to create 3 -> 3 = image based on revision 1 (og image)

CI/CD CLI command for change-cause: for when you don't want to always change the deployment's yaml file.
- `kubectl annotate <deployment_name> 'kubernetes.io/change-cause'='<change_cause>'`
    - Should output deployment has been annotated in the terminal

`kubectl rollout status deployment <deployment_name>`
- to check on if the deployment is ok

## Scaling Deployments w/ Kubectl

`kubectl scale deploy <deployment_name> --replicas=<value>`
- Temporary scale the number of ReplicaSets of a deployment.
- Won't reflect what's in the yaml file for the deployment
    - `kubectl diff -f <file>`: will show a generation advance and the reversion from the scale number of replicas to that in the yaml file.
- Really only used  for quickly restarting the replicas when they are in an unhealthy state and there's no configuration issues
    - scale with `--replicas=0` and then back to the desired number of replicas to quickly restart all the replica pods
- When doing `scale` there will be no changes when doing `kubectl rollout history`

## Failed Rollouts Troubleshoot
`kubectl rollout status deployment <deployment_name>`
- Will give the concise status of the current deployment resource
- `kubectl rollout undo` will revert to last working state the deploymnent had
- When the rollout gets changed and it matches a previous revision, the newest revision will take over the older version and and update the change-cause if annotation cmd was done

ex:
```
Revision        Change-Cause
1               init deploy
2               init CI/CD
3               test node_img
4               new image base 1
5               new src image_test1

kubectl rollout undo
kubectl annotation 'kubernetes.io/change-cause'='failed src image. Revert to base1'
kubectl rollout history
Revision        Change-Cause
1               init deploy
2               init CI/CD
3               test node_img
5               new src image_test1
6               faild src image. Revert to base1
```

`kubectl rollout history <deployment_name> --revision=<revison_num> -o yaml`
- `deployment.kubernetes.io/revision-history` will show what revision numbers the current revision has taken 
    - ex: 4,6 





