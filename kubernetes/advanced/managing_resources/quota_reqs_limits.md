# Resource Quotas, Requests & Limits

Set limits on how much CPU, memory, & storage objects might use.

Resource Quotas, Requests, and Limits ensure that resources such as CPU, memory, and storage are distributed fairly among apps and prevent a single app or namespace from consuming excessive resources.

## Resource Quotas
Policy applied at the Namespace level that defines hard limits on the number of resources (such as CPU,memory and object counts) that can be consumed by all objects within that namespace.

```
apiVersion: v1
kind: ResourceQuota
metadata:
    name: dev-quota
    namespace: dev
spec:
    hard:
        requests.cpu: "1000m"
        requests.memory: "2Gi"
        limits.cpu: "2000m"
        limits.memory: "4Gi"
```

## Requests and Limits
Defined at the container level within Pods, and specify how much of each resource a container needs.

Reqeuests specify the minimum amount of CPU or memory a container should always have availabele after scheduling.

Limits specify the max amount of CPU or memory a container is allowed to use.

If we go over the resource quota limits, the containers/pods will fail once the quota is filled. The pods created when the quota is available will still be able to run

Pods must specify Requests and Limits if Resource Quotas are set for the namespace!

***Caution setting limits for CPU & memory. Kubernetes allows for any value of limits setting, but be aware of what the hardware or VM is able to handle otherwise errors outside of k8***

[heavy-color-api-yaml](./resource_quota_ex/heavy-color-api.yaml)
- This is an example of a pod that will cause the resourcequota set for the dev namespace to go over the limits, therefore it will not be created.
- Will see an error from the server with a (Forbidden) and saying the pod that was trying to be created exceeded quota of the the targeted resourcequota attached to the namespace.

## Deployments and Reqs/Limits

A common pitfall is using deployments in namespaces with a resourcequota. Rollouts can have a tendency to cause errors when rolling out new versions of deployments. This is visible at the replicaset level where the rs is trying to create new pods but getting a forbidden: exceeded quota error msg. `kubeclt describe rs <rs_name> -n <namespace>`

Ways to navigate:
1. Delete any resources that aren't being used to free up quota
2. Edit at the container/pod level the requests and limits of the pod (right-size them)
3. Directly edit the resourcequota in the namespace if you know there's hardware available to accomodate it.