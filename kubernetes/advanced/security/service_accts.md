# Service Accounts in Kubernetes
Interact with Kubernetes clusters from within applications and services.

When applications or processes inside Kubernetes pods need to perform actions on resources (reading configmaps, writing logs, or scaling deployments), they need permissions to access the Kuberenetes API.
- Access is handled via Service Accounts rather than traditional user credentials

Service Accounts authenticate via JWT tokens.
- JWT tokens are automatically generated and mounted by Kubernetes inside each pod using a service account.
- Mounted under: `/var/run/secrets/kubernetes.io/serviceaccount/token`
- Use this token to autheticate our requests against the Kubernetes API.

Some key differences b/w service accounts and user accounts:
1. User accounts are for humans while Service accounts are for application processes, which (for Kubernetes) run in containers that are part of pods.
2. User account names must be unique across all namespaces of a cluster.
- Service accounts are namespaced: two different namespaces can contain a ServiceAccount that have identical names.
3. User and SErvice accounts have different lifecycles.
- Service accounts are more lightweight and easier to create.
- Makes them easier for wrokloads to follow the prinicple of least privilege