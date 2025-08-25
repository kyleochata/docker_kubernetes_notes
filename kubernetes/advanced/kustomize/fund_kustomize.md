# Kustomize

Declaratively customize and manage multiple Kubernetes resources

Kustomize allows for customization of K8 manifests without needing to duplicate and modify the original files or their copies

Follows the principle of declarative management:
- Declare which customizations and patches to be applied
- Kustomize calculates the final resulting manifests

Kustomize addresses the challenges of managing configurations of similar applications for different environments.
- K8-Native manifests can lead to  a lot of duplication and overhead

Key Concepts:
1. Bases and Overlays
    - Base: set of common YAML configurations that are shared across envrionments.
    - Overlay: apply environment-specific customizations on top of a base.
2. No Templating
    - Kustomize only uses standard YAML
    - No complex templating (Helm); lower learning curve and simpler configuration files.
3. Resource Patching
    - Kustomize allows for modification to only specific parts of a resource.
4. Label and Annotation Management
    - Can set common labels and annotations across multiple resources to make resource grouping and tracking easier
5. Hnadling Secrets and ConfigMaps
    - With Kustomize can dynamically generate ConfigMaps and Secrets from files or env variables
    - Easier to manage sensitive information and configuration data

## Kustomize v. Helm

### Overall Purpose
Kustomize:
- Customize existing K8 YAML manifests aby overlaying changes also defined in YAML

Helm:
- Package manager for K8 with support for templating, dependency management, and versioning of applications

### Complexity
Kustomize:
- Simpler to work with since it leverages only native YAML construct.
- No templating languages

Helm
- More complex to work with 
- Go templates and overall structure of charts.

### Customization features
Kustomize:
- Strategic merge patches, JSON patches, name prefixes/suffixes, commone labels, and annotations

Helm:
- Full templating system with conditionals, loops and variable substitution.

### Use-Cases
Kustomize:
- Manageing environment-specific customizations: dev, staging prod, etc.
- Applying patches and modifications without duplicating YAML 

Helm:
- Packaging and managing applications and their dependencies
- Versioning of applications
- More advanced customizations via templates and values files

## LAB: Creating a Kustomize Projects
0. Create a [namespace](./first_kustomize/dev-ns.yaml), [deployment](./first_kustomize/nginx-deploy.yaml), [service](./first_kustomize/nginx-svc.yaml)

1. Creating the Kustomize Base Layer: [kustomization.yaml](./first_kustomize/kustomization.yaml)
- Base layer is the common set of YAML files that will be able to be reused across namespaces rather than having to `kubectl apply` manually across namespaces.
- Resources: are the list of K8 files to be [managed by Kustomize](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/2025-Updates-Kustomize-Basics/Kustomize-ApiVersion-Kind)

2. `kubectl kustomize .` then `kubectl apply -k .`
- `kubectl kustomize .`: will preview the auto-generated YAML files that Kustimize creates for the resources managed in the kustomization.yaml
    - Redirect to an output file: `kubectl kustomize . > <file_name>.yaml`
- `kubectl apply -k` is the declarative application of the resources being managed by the kustomization file.
    - `-k`: apply resources in kustomization.yaml
    - Without a namespace named in the kustomization file, resources are applied in the default namespace

3. Clean up kustomize resources: `kubectl delete -k .`
