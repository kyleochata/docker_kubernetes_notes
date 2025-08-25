# Bases & Overlays in Kustomize
Compose and Customize different environments.

## Base
Set of common Kubernetes resources: deployments, services, ConfigMaps; that're shared across multiple environments.
- Bases are reusable and provide the foundation for your different environment configurations.

## Overlay
Set of environment-specific changes that are layered on top of the base.
- Environments can apply their own customizations like changing replica counts, image tags, or enabling/disabling certain features 
- When building the final configurations, Kustomize merges the overlay on top of the base
    - Base remains intact while still being able to generate a customized configuration for specific environments

## Ex:
`proj/base/kustomization.yaml`
```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
    - deployment.yaml
    - service.yaml
```

`proj/overlays/prod/kustomization.yaml`
- overlay references the base kustomization file for its resources
```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
    - ../../base
patches:
    - path: prod-replicas.yaml

```

`proj/overlays/dev/kustomization.yaml`
- Reuse the base layer for different namespaces while applying their independent patches.

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
    - ../../base
patches:
    - path: dev-replicas.yaml
```

***Best Practice***
- Generally keep the namespace files separate from overlays and base layers.
    - Will typically not be app specific and rather just namespaces for the entire company

### LAB: Create Overlays
`kubectl apply -k overlay/dev` & `kubectl apply -k overlay/prod`


Random LINUX
`cp source_file destination`
`mv <source_file> [destination]`
- `*.yaml` for moving all rather than individually type out file names