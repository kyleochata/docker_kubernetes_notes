# Dockerfile to Pods
0. Ensure minikube is running
- `minikube start`

1. Build the image from a docker file.
- `docker build -t <dockerHub_username>/<image_name>:<image_tag> .` 
- `docker images <dockerHub_username>/<image_name>` to ensure it built locally


2. Push image to DockerHub
- `docker login`
    - Need username, password or Personal Access Token(PAT)
    - Tokens can be generate on the dockerhub website under settings/PAT
- `docker push <dockerHub_username>/<image_name>:<image_tag>`
    - Confirm in DockerHub browser under `Repositories`

3. Pod creation
- Ensure that `kubectl config current-context` is in the right cluster
    - `kubectl config set-context <cluster_name>` to change clusters
- `kubectl run <pod_name> --image=<dockerHub_username>/<image_name>:<image_tag>`
- `kubectl get pods` to check for creation
    - `logs`, `describe` to check for events and meta-data
    - Can spin up a [alpine pod to shell](kubectl_pods.md)into the IP address of the newly created pod if you want. 

4. Clean up
- `kubectl delete pod --force=true alpine` if pod was created for sh/curl testing
- `kubectl delete pod --force-true color-api`