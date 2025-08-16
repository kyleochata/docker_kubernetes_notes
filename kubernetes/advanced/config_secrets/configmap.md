# ConfigMap
Decouple and Inject configuration data into Pods

ConfigMaps can be used to store non-sensitive data in key-value pairs and decouple this data from the Pod definitions and lifecycle.

Can be referenced multiple ways:
- Passed as environment variables
- Passed as files via volume mounts

Data can't exceed 1MB in size.
Pods must be in the same namespace as the `ConfigMap` they reference.
- **Exception: when fetching values directly via Kubernetes API**

Can make `CongifMap` immutable so that it can't be updated and must be deleted and recreated for changes to take place.

## LAB: Basic ConfigMaps as env vars
0. Update the color-api project to either get the color to return from the environment variables or from a filePath that points to the configMap.
1. [`red-config.yaml`](./configmap_ex/red-config.yaml)
- `metadata.name` doesn't have to match the filename
- `data.key: value` is the format.
    - Generally ALLCAPS for key denotes use as env variable (general practive not rule of thumb)
- `|` denotes usage of multiline value for that key.
    - Typically used for mounting the particular configmap as a file.
2. `kubectl apply -f .`; `kubectl get configmap`
- View configmap content: `kubectl get configmap <cm_name> -o yaml`
3. [red-color-api](./configmap_ex/red-color-api.yaml)
- Load configmap:
    a. `spec.containers.envFrom.configMapRef.name`
        - This requires all key's to have the correct name that matches exactly to what's being used in the source code. (like setting regular env var)
    b. Decoupling the configmap from the code:
    ```
    spec:
        env:
            - name: DEFAULT_COLOR
              valueFrom:
                configMapKeyRef:
                    key: COLOR              # key-val pair mapped to the new DEFAULT_COLOR
                    name: red-config        # metadata.name from red-config.yaml
    ```

    Choose `a` for when you have a lot of configmap values; `b` is more verbose and decouples the code variable names from the configmap.
4. `kubectl describe pod red-color-api`
- ensure that `Environment.DEFAULT_COLOR` is set to the 'COLOR' of config map 'red-config'
5. `kubectl expose pod red-color-api`
6. `minikube service red-color-api`
- Opens a browser window that'll show the red-color-api on screen where the h1 is red rather than default blue if there was no env var loaded

## LAB: Mount configmaps as volumes
0. [green-config.yaml](./configmap_ex/green-config.yaml)
1. Set the `COLOR_CONFIG_PATH` env variable.
- The `getColor` func in the color-api:1.3.0 will read the path to extract the color.
2. Mount the configmap in the `spec.volumes.configMap`
- All key-val pairs in the config map will be mounted as separate files in the mountPath location.
    - `color.txt` & `hello-from-green.js` files will be found at the `volumeMounts.mountPath` location.
3. `spec.contianers.volumeMounts.readOnly` === true to prevent editing of the configMap. 
4. `kubectl apply -f`: green-config & green-color-api
5. `kubectl exec -it green-color-api -- sh`
6. Able to `cat /mnt/config/color.txt` and `node /mnt/config/hello-from-green.js`
- Each key-value pair is created as it's own file in the /mnt/config directory
7. `echo "yellow" > color.txt` will fail due to the `readOnly: true` being set for the 
8. `kubectl expose pod red-color-api`
9. `minikube service red-color-api`

Segregation of env vars and files:
`green-config.yaml`
```
apiVersion: v1
kind: ConfigMap
metadata:
  name: green-env-vars
data:
  color.txt: green
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: green-files
data:
  COLOR_CONFIG_PATH: /mnt/config/color.txt
  hello-from-green.js: |
    console.log("Hello from")
    console.log("The green config map")
```

`green-color-api.yaml`
```
apiVersion: v1
kind: Pod
metadata:
  name: green-color-api
  labels:
    app.kubernetes.io/name: green-color-api
spec:
  containers:
  - name: color-api
    image: kyleetrata/color-api:1.3.0
    envFrom:
        - configMapRef:
          name: green-env-vars
    volumeMounts:
      - name: color-files           # name of vol
        mountPath: /mnt/config
        readOnly: true
    resources:
      limits:
        memory: "128Mi"
        cpu: "500m"
    ports:
      - containerPort: 80

  volumes:
    - name: color-files         # name of vol
      configMap:
        name: green-files       #configMap metadata.name

```

Only mount the green-files configMap while using the green-env-vars configmap to load env vars for the containers