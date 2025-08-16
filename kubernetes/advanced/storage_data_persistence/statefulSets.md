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

## StatefulSet Lab: Statically Provisioned Volumes
Static default reclaim policy is `retain` so the PV will remain after PVCs removed

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
- StatefulSets work kinda like a deployment format with `spec.selector.matchLabels` to decide what it oversees. `spec.template` that will make the Pods.
    - Don't include a name in the `spec.template.metadata.name` because that'll be assigned in the `metadata.name` and be demo-ss-1 ex.
    - In `spec.template.spec` no volume will be specified; Will be dynamically created based off of the `spec.volumeClaimTemplates`.
- `spec.volumeClaimTemplates`: define the type of persistent volumes we want dynamically created.
    - K8 will create the PV automatically which is why the `spec.volumes` was left off in the template for the pod.
    - If more than 1 PV is desired for the Pod, add more vcTemplates
- Make sure that pvs.yaml creates the PV before the statefulset runs. 
    - May run into an issue where `local-storage` storageClassName isn't found causing the PVC to no bind to the PV's made.
    - Work arounds:
        1. Manually delete pod,pvc. Have the statefulset recreate them. 
        2. Create the `local-storage` storageclass. Sometimes it might not work with just the default storageclass.

3. Create a file within the first `demo-ss-0` pod.
```
kubectl exec -it demo-ss-0 -- sh
echo "hello from demo-ss-0" > /mnt/local/hello.txt
exit
```
4. Exec into `demo-ss-1` to show that `hello.txt` wasn't created in this pod.
    -  The pods have their own PV (ss-0 for demo-ss-0)
    - `kubectl describe pod demo-ss-0` & `kubectl describe pvc local-volume-demo-ss-0`
5. Delete `demo-ss-0`
6. `demo-ss-0` is recreated by the statefulset.
7. Exec into `demo-ss-0`
8. `cat /mnt/local/hello.txt`
- The file is still there even after destroying and recreating the pod.
9. `kubectl delete -f .`
- This will delete the pod and the statefulset, but the pvc & pv's can take a while and remain in a terminating state for a while. 
    - Use below for faster clean up

Force delete PV:
`kubectl patch pv <pv_name> -p '{"metadata":{"finalizers":null}}'`
- Manually removes the finalizer that can leave the pv in a terminating status for a long time
- `--all` to delete all.
Force delete PVC:
`kubectl delete pvc <pvc_name> --force --grace-period=0`
- `--all` to delete all


## StatefulSet Lab: Dynamic Volume Provisioning
Dynamic provisioning is the claim is made first and then the pv's are made to fit the claim.
- Remove the storageClassName property or set to standard in the volumeClaimTemplate

Hostpath deletion in minikube:
```
minikube ssh
cd /tmp/hostpath-provisioner/default/
