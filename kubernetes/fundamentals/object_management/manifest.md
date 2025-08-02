# K8 Manifest Files

Manifest files is a YAML files that defines the DESIRED state of a K8 object

```
apiVersion: v1
kind: Pod
metadata:
    name: my-nginx-pod
    labels: 
        app: nginx
spec:
    containers:
        - name: nginx
          image: nginx
          ports:
            - containerPort:80
```

`apiVersion`
- Defines which API group and respective version of the API is being used to create the object

`kind`
- Defines which exact object or resource is being managed by the config file.
- Must be supported by the specified `apiVersion`

`metadata`
- Defines data that is used to uniquely identify the object
    - name, namespace, labels, annotations
- K8 may also add information to the `metadata` section

`spec`
- Defines the actual configuration for the objects being managed by the configuration file
- Exact shape of the config varies according to both the `kind` and `apiVersion`