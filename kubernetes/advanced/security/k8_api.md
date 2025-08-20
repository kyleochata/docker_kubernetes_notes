# Kubernetes API
Understand how the API paths and groups are structured

## Kubernetes API is the interface used to interact with and manage the resources in the k8 cluster.
- `kubectl` (k8 dashboard) or external services all perform operation through API calls.
    - API requests are sent to the K8 API server, which process them and communicates with the rest of teh cluster components.
- Every resource in K8 (pods, services, configmaps, deployments, and others) is accessible via the API under its corresponding RESTful endpoint.
- Pass `--v=8` to `kubectl` to get more details about the underlying HTTP request made by the CLI.

```
kubectl get pod
GET http://<api-server>/api/v1/namespaces/default/pods

kubectl get pod -A
GET http://<api-server>/api/v1/pods

kubectl get role
GET http://<api-server>/apis/rbac.authorization.k8s.io/v1/namespaces/default/roles
```

## K8 API Groups
Kubernetes organizes its API resources into logical groups known as API Groups
- API Groups allow k8 to extend and evolve without breaking existing resources or creating conflicts.
- Different API Groups can define relates resources & each Group typically represents a versioned API with its own path.
- Groups are referenced in the `apiVersion` field of k8 manifest
    - `apiVersion: <groupname>/<version>`

Resources are split into the **core** API group (no group name in apiVersion of manifest) and **named** API groups

### Core API Group
Default API Group for K8's most essential resources:
- Pods, Services, configMaps, Namespaces
- Accessible under the `/api` top-level path of the K8 API
```
https://<api-server>/api/v1/pods
https://<api-server>/api/v1/namespaces
https://<api-server>/api/v1/namespaces/default/secrets
```

### Named API Groups
Contains additional resources and extend the functionality of K8.
- Accessible under the `/apis` top-level path of the K8 API and under their own group path.
```
https://<api-server>/apis/apps/v1/deployments
https://<api-server>/apis/apps/v1/namespaces/default/deployments
```

### Subresources
Some resources also have subresources allowing for very fine-graned control when setting permissions via RBAC roles.

Pods:
1. `logs`
- `/api/v1/namespaces/{namespace}/pods/{name}/log`
2. `exec`
- `/api/v1/namespaces/{namespace}/pods/{name}/exec`
3. `attach`
- `/api/v1/namespaces/{namespace}/pods/{name}/attach`

Deployments:
1. `scale`
- `/api/v1/namespaces/{namespace}/deployments/{name}/scale`
2. `status`
- `/api/v1/namespaces/{namespace}/deployments/{name}/status`



## `kubectl api-resources`
Display and then use `--help` to get more information on availabe resources.

`kubectl api-resources --api-group=<api-group-name> -o wide`
- displays the verbs that are allowed for that resource