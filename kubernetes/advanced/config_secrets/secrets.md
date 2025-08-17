# Secrets in K8
Decouple & inject sensitive data into Pods

Secrets can be used to store and inject sensitive data into containers. Allow for sensitive information to not appear in application code.

Data stored in base64-encoded and encrypted by default, but it is possible to set up encryption at rest for secrets.
- Base64-encoded isn't exactly secured; easily cracked.

Best practice is to set up RBAC rules with least-privilege permissions, so only authorized parties are allowed to retrieve or update the values of secrets.

Accessing `Secrets` is similar to accessing `ConfigMaps` (both objects work similarly to each other from the Pod's / container's perspective), and they can be:
- Passed as env variables
- Passed as files via volume mounts

In addition to generic secrets, K8 also has other specific secret types, such as `ServiceAccount` tokens, TLS secrets, among others. Cloud providers and their managed K8 offerings normally provide native integration with secrets manager for improved and more secure secret storage.

Pods trying to access secrets must be within the same cluster. 

## Secrets via Environment Variables 
`kubectl create secret <secret_type>`
- Types: docker-registry, generic, tls

1. Create secrets in kubectl
- `kubectl create secret generic db-creds --from-literal=username=db_user --from-literal=password=db_pass`

2. [demo-pod](./secrets-ex/demo-pod.yaml)
- `spec.containers.env.valueFrom.secretRef.key` = db_user
- `spec.containers.env.valueFrom.secretRef.name` = db-creds

```
    env:
      - name: DB_USER
        valueFrom:
          secretKeyRef:
            key: username
            name: db-creds
      - name: DB_PASSWORD
        valueFrom:
          secretKeyRef:
            key: password
            name: db-creds
    envFrom:
      - secretRef:
          name: db-creds
```

`env` version is for decoupling the secret variable names from the source code variable names.
`envFrom` is for just loading all the secret variables into the pod, but the code variable names must match the secret variable names

## Secrets as a Volume
0. Create the secrets via the kubectl cmd.
1. In the yaml file have the following:
- `spec.containers.volumeMounts.name` - name that you want the volume mounted as
- `spec.containers.volumeMounts.mountPath` - path you want the volume mounted to.
- `spec.volumes.name` - name of the volume.
- `spec.volumes.secret.secretName` - name that we used for after `kubectl create generic <secret_name>`
- `spec.volumes.secret.items.key` - the key used in the `--from-literal=<key_name>=<key_value>`
  - Essentially makes a path from the mountPath/key_name
- `spec.volumes.secret.items.path` - Where within the `spec.containers.volumeMounts.mountPath` the secret value should be placed.
2. `kubectl exec -it busybox -- sh`
3. `cd /etc/db`
4. `ls`
- Will show that there's one dir named dev
5. `cd dev`
6. `cat password`
- Should return `db_pass`


### Cleanup
`kubectl delete secret <secret_name>`