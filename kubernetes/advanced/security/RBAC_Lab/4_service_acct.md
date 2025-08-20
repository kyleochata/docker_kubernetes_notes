# Creating Service Accounts

1. [SA manifest](./rbac_files/service-account/pod-inspector.yaml)
2. `kubectl get sa -n dev`
- By default: service accounts don't have any permissions.
3. Update [pod manifest](./rbac_files/pods.yaml) to reference the service account name in the `spec.serviceAccountName`
- Must match the name of the serviceaccount within the namespace that the pod was created. 
4. `kubectl exec -it alpine-curl -n dev -- sh`
5. `cat /var/run/secrets/kubernetes.io/serviceaccount/token`
    - Token created by K8 to allow for the serviceaccount to auth with K8 API
6. `TOKEN=$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)`
    - `echo $TOKEN` for confirmation var was set.
7. Extend the [pod-reader rolebinding](./rbac_files/roles/dev-pod-reader-rb.yaml) to add the serviceaccount under `subjects`.
    - Give perms to the service account to have the role of `dev-pod-reader` through the rolebinding for that role.
    - kubectl describe rolebinding pod-reader -n dev: should have the ServiceAccount pod-inspector.
7. `curl -s --header "Authorization: Bearer $TOKEN" --cacert /var/run/secrets/kubernetes.io/serviceaccount/ca.crt https://kubernetes.default.svc/api/v1/namespaces/dev/pods`
    - `--header "Authorization: Bearer $TOKEN` is for settting the JWT token in the header
    - `--cacert`: provide the CA cert to verify the K8 API server's tls certificate.
        - K8 atuomatically mounts this for service accounts
        - API server uses HTTPS with a certificate signed by the cluster's CA (cert authority).
    - curl pod and k8 api server do the TLS handshake. k8 api server sends its TLS certificate. The curl pod uses the cacert (which contains the public key of the Kubernetes Certificate Authority) to verify the digital signature on the TLS certificate. This proves the TLS cert was issued by the cluster's trusted CA, confirming the pod is indeed talking to the real k8 api. Then, inside the now-secure connection, the curl pod shows the api its token to authorize the specific operations and HTTPS requests it wants to perform
