# Declarative Management of K8 Objects

By using the declarative approach of `apply` we can pass in individual files or whole directories with the `-f`

If we change something in one of the yaml files, unlike the imperative approach where we have to `delete` then `create`, we can do `apply` again and k8 will intuitively change the container/pod configs.
- To view what's changing in the declarative approach use `kubeclt diff -f <filename | directory_with_yamls>`
    - This will compare the `LIVE` yaml files that k8 is currently using to the `MERGED` yaml file (one(s) we just updated)
    - `kubectl apply -f <file_name | directory>`, it'll output with a `configured` or `unchanged` after every resource being managed by the file(s) / directory(s)
    - ex:
        - If we only changed an image for the pod's container, doing `kubectl describe pod <name>` will show that the whole pod didn't get taken down an d it was only the container that was restarted with the new image.
        - Events will also describe if it pulled a new image and when the scheduler assigns the pod will be when the pod was first created!
        - `kubectl get pod nginx-pod -o yaml` will have a `annotations: kubectl.kubernetes.io/last-applied-configuration:` that will be matching the changed yaml file (in json format) used to configure the pod
            - Used by k8 to calculate the differences and apply the changes
`kubectl delete -f <filename | dirctory | . (current dir)>` will delete the declarative resources created with the configuration files found

## Migrating from Imperative to Declarative

`kubectl create -f nginx-pod.yaml` == imperative approach. 
- Thankfully, don't have to `kubectl delete -f nginx-pod.yaml` to switch to the declarative approach.
- Just need to do `kubectl apply -f nginx-pod.yaml`