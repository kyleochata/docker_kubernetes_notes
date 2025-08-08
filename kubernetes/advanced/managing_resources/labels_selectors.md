# Labels & Selectors

Identify and group resources meaningfully

## Labels
Key-value pairs attached to kubernetes objects(e.g pods, nodes, svc).
Provide metadata thathelps identify and organize these objects
- Labels allow k8 users to categorize and organize resources, enabling sophisticated grouping and selection mechanisms.
    - Labels *are not unique*; multiple objects can share the same label

## Selectors
Expressions used to filter k8 objects based on their labels.
- Selectors allow users & K8 components to target specific objects that match certain criteria
- **Equality-based selectors**: match objects that have a specific label key-value pair.
    - Either `=`, `==`, or `!=` for inclusion or exclusion

    ```
    selctor:
        matchLabels:
            app: color-api
            tier: backend
            <label_name>: <label_value>
    ```
- **Set-based selectors**: match objects based on whether a label's key is part of a set of values.
    - Use operators like `In`, `NotIn`, `Exists`, and `DoesNotExist`.
    - Only supported by certain k8 objects (Jobs, Deployments, ReplicaSets)

    ```
    selctor:
        matchExpressions:
            - key: tier
              operator: In
              values: [frontend, backend]
    ```

## `kubectl` Commands
`kubectl get pods -L <label_name>`
- Will return pods that have that label name.

`kubectl get pod -l <label_name>=<label_value>`
- will return pods that only match the filter label and value. `-l` flag to filter labels 
    - `kubectl get pod -l tier=frontend -l app=color-api` != `kubectl get pod -l 'tier=frontend,app=color-api'`
    - `kubectl get pod -l '<label_name> <set-based operator> (labelvalue)'`