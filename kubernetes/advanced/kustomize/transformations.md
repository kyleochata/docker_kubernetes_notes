# Transformations
Straightforward ways of customizing resources through the kustomization.yaml

`namespace`
- Assign resource to a specific K8 namespace
- `namespace: dev`: assign resources to dev ns

`namePrefix / nameSuffix`
- Prepend / Append strings to the name of all resources in the included bases
- `namePrefix: dev- / nameSuffix-01`: will give all the resources: dev-<resourse_name>-01

`commonLabels` - **Depreciated: Use `labels` instead**
- Add the same set of labels to all resources and selectors.
-`commonLabels.app: nginx, tier: frontend`

`commonAnnotations`
- Add same set of annotations to all resources
- `commonAnnotations.project: ecommerce; team: finance`

`images`
- Modify the name, tags and/or digest for images without creating patches
- `images.name: nginx; images.newName: newNginx; images.newTag:"1.27.0"`

`labels`
- Modify labels with key value pairs 
```
labels:
    - pairs:
        app: name
        key: value
      includeSelectors: true          <-- false by default
      includeTemplate: true           <-- false by default
```
- Once a deployment or service is created and added to a cluster, don't have selectors or templates injected.
    - Should never change the labels for selectors or templates in live resources
    - Want to inject selectors and templates when the resource is first getting spun up
    - `includeSelectors & includeTemplate: true` will make labels act like `commonLabels` 

# Generating ConfigMaps
Create configMaps within the kustomize.yaml

```
generatorOptions:
    disableNameSuffixHash: true

configMapGenerator:
    - name: <configMap_name>
      literals:
        - use_db=true
        - expose_metrics=true
      options:
        disableNameSuffixHash: true     # removes the hash at the end of configMap resource
    - name: db-init-config
      files:
        - db-init.js
    - name: local-config
      envs:
        - .env.local
```

Difference between files and envs:
- envs expects the `key=value` format where as files can be however you want.
- files can also have the fileValue mapped to a different key by `- dif_key=db-init.js`
    - By using files, it won't generate multiple key value pairs like how envs will.
    - Everything will be a multiline value mapped to a single key
    - No access to individual keys when using a .env file

# Generating Secrets
Creating Secrets in the kustomize.yaml

```
secretGenerator:
    - name: local-config
      envs:
        - .env.local
      type: Opaque          # generic secret
```

## How to use generated configMap / Secrets 
Do a typical volume mount for the configMap / Secret within the deployment, statefulset, pod manifest. 
Kustomize is smart enough to add the prefix, suffix, suffixHash to any of the mounted secrets or configMaps to follow the naming convention stated in the overlay.

```

```