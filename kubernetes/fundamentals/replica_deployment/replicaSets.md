# ReplicaSets 

Ensure that a certain number of pods are running at any given time

If a pod breaks or enters into an unhealthy state, we need to manually intervene.

ReplicaSets address the issue of replacing exited or unhealthy pods and make sure that a stable number of identical pods are running at any point in time.
- Ensures high availability and fault tolerance by automatically replacing failed or terminated pods

ReplicaSets work by identifying pods via `selectors` and continuously checking whether the number of running pods matches the desired number of pods specified in the configuration.

ReplicaSets will recreate pods automatically based on the `template` section in their spec.


Example replicaset.yaml
```
apiVersion: apps/v1
kind: ReplicaSet
metadata:
    name: nginx-replicaset
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
            containers:
                - name: nginx
                  image: nginx:1.27.0
```

- If the template metadata didn't have the same labels as the replicaset metadata, then we can run into issues where the pod will get created but not tracked by the replicaset.

## kubectl cmds

`kubectl apply -f <filename>`
- Declarative creation of replicaset using a yaml file

`kubectl get rs`
- Get information on created replicasets

`kubectl describe rs <rs_name>`
- detailed information about rs
- Number of replicas, pod status

## ReplicaSet Limitations

If we change the template on an already running `rs` then it will not automatically take the existing pods it's managing down to impliment the new image for the containers. 

It will only see if there are enough pods existing to satisfy it's configuration and only use the new image in the template once it's required to start new pods. 

Updating pods with purely ReplicaSets is not the easiest thing to do. That's where `Deployment` comes in: higher abstraction that comes in and handles rolling out updates