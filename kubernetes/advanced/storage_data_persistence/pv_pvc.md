# Persistent Volumes & Persistent Volume Claims

Claim durable storage for usage in Pods. Can't use PV directly in Pods

A `PersistentVolumeClaim` is what actually reserves a PV (when using static povisioning) or creates and reserves a PV (when dynamic provisioning)
- Claims are bound to a single `PersistentVolume`, and a `PersistentVolume` can have at most one claim bound to it.
    - One to one volume to claim
    - Can set specific criteria in a claim,so that only PVs that match these criteria are considered for binds
    - Be mindful of the possibility for extra unused capacity (static provisioning)
    - Reclamation policies can be `Retain`, `Delete`, or `Recycle`(depreciated)
        - `Retain`: if dynamically provisioned and claim is deleted, the volume will continue to exist
- Access Modes:
    - `ReadWriteOnce`: volume can be mounted as a read-write by a single node. Can be used by any number of Pods within the node.
    - `ReadOnlyMany`: volume can be mounted as read-only by many nodes.
    - `ReadWriteMany`: volume can be mounted as read-write by many nodes.
    - `ReadWriteOncePod`: volume can be mounted as read-write by a single Pod.

`kubectl delete pvc <pvc_name>`- If the PV reclaim policy is `Retain`, deleting the pvc assigned to the PV will cause the PV to go into a `released` status. 
- Still unable to be used by another pvc (when `Retain` is the config)

`kubectl get persistentvolume | pv` - view PVs in a namespace

`kubectl delete pv <pv_name> --force`: will delete the PV, but if there was a `Retain` policy, then the `minikube ssh; cd <path_of_local_pv>` will still exist with all the files (since it's local to the minikube node)


```
kind: PersistentVolume
spec:
    local:
        path: /mnt/disks/local1 #must exist in node
---
kind: Pod
spec:
    volumeMounts:
        - name: local-vol
          mountPath: /mnt/local
```
Ensure that the `local.path` in the `PersistentVolume` actually exists within the node. Otherwise it'll return a a failed volumeMount error that the path doesn't exist.
```
To create the PV path in minikube:

minikube ssh
sudo mkdir -p <path_for_PV>
sudo chmod 777 <path_for_PV>    # Change mode to allow everything in this dir
cd <path_for_PV>                # Check that the path exists
```

`kubectl delete pvc <pvc_name>` - to delete old pvc (if name has changed from the yaml file)



## Static v. Dynamic Provisioning
Pods can use static and dynamic provisioning claims simultaneously

Static:
- Best-effort match based on access mode and size requests.
- Looks at the exisitin PVs
- Might not be fulfilled based on what's available
- PV is created first then the claim tries it's best to find a PV that fits.

Define the claim that should be used for the volume desired.
```
kind: Pod
spec:
    volumes:
        - name: local-vol
          peristentVolumeClaim:
          claimName: <pvc_name>
```

Dynamic:
- Provisions storage dynamically when PVCs are created.
- If the backend supports what's requested, it will always be fulfilled.
- Claim created first then PV is made behind the scenes

```
kubectl get storageclass
kubectl describe storageclass <name>
```
This will show if the storageclass is the default.
- When a [dynamic-pvc](./volume_ex/dynamic.yaml) is made without the `spec.storageClassName` it will be bound upon creation due to a PV being created for it.
    - Volume created will have annotations of what provisioned it (`hostpath` in this case) 
    - `Path` of where the volume was mounted
        - Don't have to created the path manually like in the static version
    - Reclaim Policy default is delete. When pvc is deleted, pv goes with it.
        - Circumvents the issue of lots of volumes being created and unused when no longer needed.
        - General pattern for cloud based providers rather than the static way (or with Minikube)
- Deleting the pv dynamically created won't work until the pvc it was made for is deleted.