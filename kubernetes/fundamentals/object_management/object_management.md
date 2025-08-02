# Object Management in Kubernetes
Understanding the multiple approaches available to manage k8s objects

## Imperative Management with `kubectl`
Main Commands:
```
kubectl create <resource> [config]
kubectl delete <resource>
kubectl expose <resource> <name>
kubectl [get | describe | logs] ...
```


Pros:
- Lowest learning curve
- Cmds transparently communicate changes via single word actions
- Single step to make changes to the cluster


Cons:
- Not possible to save templates for creating new objects
- No change review nor audit trail possible
- No records of what has been created / deleted (only what is in the cluster currently)


## Imperative Management with Config Files
Main Commands:
```
kubectl create -f <filename>
kubectl delete -f <filename>
kubectl replace -f <filename>
kubectl [get | describe | logs] ...
```

Pros:
- Config files can be committed, reviewed , and audited
- Files provide a template for creating new objects
- Simpler than declarative management
    - Explicitly telling k8 what to do rather than k8 figuring it out

Cons:
- More suitable for single files, rather than directories
- Requires familiarity with object schemas for each object being managed
- Doesn't persist updates made outside of the config files 


## Declarative Management with Config Files
Main Commands:
```
kubectl apply -f <filename>
kubectl diff -f <filename>
kubectl delete -f <filename>
kubectl [get | describe | logs] ...
```

Pros:
- Persists updates made to live objects even if not reflected in the config files (`apply`)
- Better support for automatically identifying necessary operations for each object

Cons:
- Highest learning curve
- Partial updates are more complex to understand and debug
- Live objects state might not be entirely reflected in the config files


