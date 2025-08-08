# Namespaces

Improve isolation for gropus of resources

Namespaces provide a way to divide cluster resources b/w multiple users, teams, apps or environments.
- Allows for resource isolation and helps organize workloads in large K8 clusters
- Namespaces enable logical isolation of resources within the same physical cluster
- Initial namespaces: `default`, `kube-system`, `kube-public`, `kube-node-lease`

Common Use Cases:
- *Multi-tenant clusters*: Each team can take care of their applications, and keep their resources (pod, services, etc) logically separated.
- *Environment separation*: Each environment can have its own resouces, with different policies and quotas applied
- *Resource Quotas*: Wish to limit the CPU, memory, and number of resources that a namespace can use.
    - Prevents one team or env from monopolizing cluster resources
- *Security & Access Control*: Limit user or service account access to specific resources via RBAC (role based access control) mechanisms.
    - Ensures that users or services can only access resources within their allowed namespaces

Using Namespaces
- Must inform in which namespace resources are created in
- Set current namespace for all `kubectl` commands, or pass it explicitly in each command
- Service communication requires that fully qualified domain name (FQDN) of the service

Best Practice around namespaces:
- *Don't overuse them*: consider whether there's a solid case for logically isolating the cluster resources
- *Combine namespaces with RBAC*: imporve security around resouces deployed in each namespace
- *Limit the resources a namespace can use*: implementing resourdce quotas to namespaces resource requests and limits totheir respective resources
- *Use menaingful dimensions to define the namespaces*: Make sure they align with the overall team and environment setup of projects

## Creating Namespaces
`kubeclt apply -f .`
- Create a new namespace based off of yaml files in current dir

`kubectl get namespace`
- Get all created namespaces in current cluster

`kubectl get <resource> --namespace <namespace_name>`
- Get desired resource in the specified namespace

Get resource across all namespaces:
- `kubectl get <resource> <-A | --all-namespaces>`
- Use the `-A` || `--all-namespaces` flags to get the desired resource(s) across all namespaces

To add a resource to a non-default namespace:
- Add the `namespace: <namespace>` to the metadata section of the resource's metadata section of the yaml file.
- After creating the resource, `kubectl get pod` it will show that no resources are found in the default namespace.
    - Will have to do `kubectl get pod <-n | --namespace> <namespace_name>`
    - `-n` == `--namespace` flags for designating the namespace we want to query to

To set the context of the current namespace rather than always doing `-n`:
- `kubectl config set-context --current --namespace=dev`
- This will set the namespace while keeping the current context of the active cluster
- `kubeclt config get-contexts` || `kubectl config view`: check the current context settings

***ALWAYS do `kubectl config get-contexts` | `kubectl config view` before running destructive cmds to ensure correct namespace***

If you run a delete cmd on a namespace, all resources in that namespace will also be deleted.