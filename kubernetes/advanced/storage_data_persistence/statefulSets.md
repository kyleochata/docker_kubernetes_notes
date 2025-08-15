#  StatefulSets in K8
Manage stateful applications more effectively

`StatefulSets` maintain stable identities for each pod, ensuring that even if a pod is restarted, it retains it's unique id and connection to persistent storage.
- Stable, unique network identity for each pod created as part of the `StatefulSet`
- Consitent and stable persistent storage associated with each pod, also across restarts.
- Ordered pod creation, scaling, and deletion, should ;be necessary when working with databases or replicated services.

Can specify a `PersistentVolumeClaim` template in the Pod definition, as long as this stays the same, the Pod will use the same claim and have access to the same data.
- Each replica in a `StatefulSet` will have its own `PersistentVolumeClaim` so **DATA IS NOT SHARED** across different replicas
- `PersistentVolumes` aren't deleted automatically when a replica is deleted.

Pod names and network ids are also stable.
- `<statefulset_name>-<oridnal_id>`
- Able to use headless services to expose the pods via more stable domains. 

## StatefulSet Lab
1. `minikube ssh` to create pv paths and allow their execution
```
sudo mkdir -p /mnt/disks/ss-0
sudo mkdir -p /mnt/disks/ss-1
sudo mkdir -p /mnt/disks/ss-2
sudo chmod 777 /mnt/disks/ss-0
sudo chmod 777 /mnt/disks/ss-1
sudo chmod 777 /mnt/disks/ss-2
```
2. [statefulSet.yaml](./stateful-sets/statefulset.yaml) & [pvs.yaml](./stateful-sets/pvs.yaml)
