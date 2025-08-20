# Minikube Roles & ClusterRoles

Kubernetes has no concept of a user-store. Integrates with third party solutions 

`kubectl config view`
- `users.name` shows the user that is being used (minikube for default minikube config)

## Connect clusters to users:
`contexts.context.user` --> default == minikube.
- When we use that cluster, we use if as the `contexts.context.user` and all of the `users.user.name` permissions that match the user.name.
- Minikube leverages ClusterRoles and ClusterRoleBindings to create the default minikube user and connect it to the default minikube cluster and set that as the context.

`kubectl get clusterroles`
`kubectl get clusterrole admin -o yaml`
- Will show everything that it's allowed to do and access.
- `cluster-admin` role is more powerful since it has `'*'` access (everything is allowed)

## Mapping of `ClusterRole` to a user is done via `ClusterRoleBindings`
- Maps the cluster-admin clusterrole to minikube user
- `kubectl get clusterrolebinding | grep cluster-admin`

`kubectl get clusterrolebinding cluster-admin -o yaml`
-  `roleRef` is the clusterrole reference that then maps it to the `subjects` property.
- `subjects` is where the type of User, Group, or ServiceAccount will be specified as well as the name of the subject.
    -  Will show that the cluster-admin `ClusterRole` is being mapped to the `system:masters` Group via the cluster-admin clusterrolebinding 

## How to tell if the user is part of the a Group?
`kubectl get config view`
- Copy `users.user.client-certificate`
`openssl x509 -noout -text -in '<users.user.client-certificate>'`
- Print the certificate in a human-readable format
- `Certificate.Data.Subject` will show: `O=system:masters, CN=minikube-user`
    - `O=` Organization. Used by k8 to identify the user's Group;
    - `CN`: common name
- `Certificate.Data.Issuer`: Shows what entity issued the certification
    - `CN=minikubeCA`: minikube cert authority for minikube default user.

    