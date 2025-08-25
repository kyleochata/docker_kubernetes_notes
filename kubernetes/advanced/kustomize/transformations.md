# Transformations
Straightforward ways of customizing resources through the kustomization.yaml

`namespace`
- Assign resource to a specific K8 namespace
- `namespace: dev`: assign resources to dev ns

`namePrefix / nameSuffix`
- Prepend / Append strings to the name of all resources in the included bases
- `namePrefix: dev- / nameSuffix-01`: will give all the resources: dev-<resourse_name>-01

`commonLabels`
- Add the same set of labels to all resources and selectors.
-`commonLabels.app: nginx, tier: frontend`

`commonAnnotations`
- Add same set of annotations to all resources
- `commonAnnotations.project: ecommerce; team: finance`

`images`
- Modify the name, tags and/or digest for images without creating patches
- `images.name: nginx; images.newName: newNginx; images.newTag:"1.27.0"`