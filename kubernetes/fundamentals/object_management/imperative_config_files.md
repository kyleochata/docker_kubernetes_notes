# Imperative Config Files to manage objects

## To create a config file out of a imperative command
`kubectl run <resource_name> --image=<image_name>:<image_tag> --dry-run=client -o yaml`

- This will output a manifest yaml file for the desired resource 
- `--dry-run=client`: means the command runs solely in the kubectl utility and never reaches the server
- `-o yaml`: will output the structure of the exact yaml file we need for creating a manifest for that resource


`kubectl create -f <filename>`

[nginx-pod.yaml example file](./nginx-pod.yaml)
- this file is the equivalent to the following imperative command in the kubectl cli:
```
kubectl run nginx-pod \
  --image=nginx:1.27.0 \
  --port=80 \
  --labels=app=nginx
  ```

[nginx-service.yaml example file](./nginx-service.yaml)
- This file is the equivalent to doing the following imperative command in the kubectl cli to create a Service:

```
kubectl expose pod nginx-pod --type=NodePort --port=80 
```
- `selector:`: This is how the Service will decide what pods will be part of the Service. `app: nginx` for example will cause the Service to only direct and use pods with the `label: app: nginx`

## Shortcomings of Imperative Cmds with Config Files

When we get a pod up and running with a config file, and then do `kubectl get pod <pod_name> -o yaml`, it'll show that K8 is adding a lot of extra porperties on to the config file.

If we take our basic [nginx-pod.yaml](./nginx-pod.yaml) file and change the image to `nginx:1.27.0-alpine` and do a `kubectl replace -f nginx-pod.yaml`, the CLI will complain because a lot of extra fields were set by k8 when the pod was first created and started. 
    - K8 needs all those fields filled in to manage the object (pod) while it's live
    - Declarative approach will help us get around this issue as it'll allow k8 to look at what was changed and apply the changes intuitively
    - Will have to `kubectl delete -f nginx-pod.yaml` then `kubectl create -f nginx-pod.yaml` when doing the imperative w/ config files