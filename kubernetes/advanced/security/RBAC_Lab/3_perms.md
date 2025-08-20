# Permissions for Users
Setting up Roles, RoleBindings and ClusterRoles for users, groups

## Roles and RoleBindings
1. Create [namespaces](./rbac_files/roles/ns.yaml)
- `dev` & `prod` namespaces
- [Launch pod in each namespace](./rbac_files/pods.yaml)
    - `kubectl get pod -A | grep nginx`
2. Create [role](./rbac_files/roles/dev-pod-reader.yaml) & [rolebinding](./rbac_files/roles/dev-pod-reader-rb.yaml)
- Sets up so that the user `bob` can read from pods in the `dev` namespace
- Switch context to 'bob': `kubectl config use-context bob`
    - kubectl apply as minikube before switching because bob/alice don't have perms to do that
- Should only be able to `kubectl get pod -n dev` and will be forbidden in the prod namespace & passing `-A` flag for all namespaces (cluster scope)

## ClusterRoles & ClusterRoleBindings
1. Create [clusterrole](./rbac_files/clusterroles/pod-admin.yaml) & [ClusterRoleBinding](./rbac_files/clusterroles/pod-admin-crb.yaml)
- kubectl apply (makesure to be in minikube context)
- kubectl get clusterrole pod-admin
- kubectl describe clusterrole pod-admin
2. Switch context to alice.
3. `kubectl get pod -A` should be successful
4. If the resource has a subresource, the subresource must be explicitly allowed in the clusterrole or role to be allowed for that user. 
    - Just setting the user/group to allow for the main resource doesn't auto allow subresource access unless * is used.
    - logs, exec are subresources of pods.