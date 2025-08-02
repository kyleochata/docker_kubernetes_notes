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

## Multiple Resources in a manifest

```
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx

spec:
  containers:
    - image: nginx:1.27.0
      name: nginx-container
      ports:
        - containerPort: 80

---     # '---' allows to separate resources on the same yaml file

# Equivalent to the imperative cmd:
# kubectl expose pod nginx-pod --type=NodePort --port=80 

apiVersion: v1
kind: Service
metadata:
  name: nginx-service
  labels:
    app: nginx
spec:
  type: NodePort
  selector:
    app: nginx    # Route requests to the pods that have the label of "app": "nginx"
  ports:
  - port: 80
    targetPort: 80
    protocol: TCP
 
```