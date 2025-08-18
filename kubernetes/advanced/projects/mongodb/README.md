# MongoDB StatefulSet for color-api Persistent Storage
This Kubernetes StatefulSet configuration provides highly available MongoDB instances to serve as persistent storage for the color-api microservice. The implementation demonstrates several key Kubernetes patterns:

## Architecture Overview
- Stateful Workload: MongoDB is deployed as a StatefulSet to maintain stable network identities and persistent storage
- Headless Service: Communication occurs via a headless Service (mongodb-svc) enabling direct DNS resolution to individual Pods

## Secure Initialization:
- Root credentials managed through Kubernetes Secrets
- Custom users/databases initialized via ConfigMap-mounted initialization scripts
- Proper security context for MongoDB container

## Key Features

### StatefulSet Characteristics:
- Stable, ordered deployment and scaling (ordinal index: 0-N)
- PersistentVolumeClaims with volumeClaimTemplates for data durability
- Pod identity maintained across reschedules (hostname, storage)

### Service Discovery:
- Direct Pod access via FQDN(fully qualified domain name): `mongodb-ss-<ordinal>.mongodb-svc.<namespace>.svc.cluster.local`
- DNS SRV records for replica set configuration

### Security:
- Secrets-based credential management. 
    - Normally would just do: `kubectl create secret generic <secret_name> --from-literal <key>=<value>` for secret creation.
    - Created yaml files for demo purposes.
- Future: 
    - RBAC for users.

### Operational Readiness:
- Liveness and readiness probes for health monitoring
- Resource limits and requests

## Integration with color-api
The color-api microservice connects to specific MongoDB replicas using the headless Service DNS entries. The API stores color data as documents with schema:
```
{
  "key": String,
  "value": String
}
```
This implementation serves as a complete example of:
- Cloud-native storage patterns
- Secure credential management
- Stateful application deployment
- Microservice data persistence



## Mongodb Init testing:
`kubectl exec -it mongodb-ss-0 -- mongosh`


```
show dbs        # should fail
use colordb
db.testcollection.find()    #should fail
db.auth('<user>', '<password>')
db.testcollection.insertOne({key: value})
db.testcollection.find()
```
Scale the statefulset up:
`kubectl scale statefulset mongodb-ss --replicas=(should_be_>_1)`

```
kubectl exec -it mongodb-ss-1 -- mongosh
show dbs        # should fail
db.auth('<user>', '<password>')
db.testcollection.find()        # should return empty (only mongodb-ss-0 has anything in it's PV)
```

Cleanup:
`kubectl scale statefulset mongodb-ss --replicas=1` Scale to the number of replicas stated in the mongodb-ss.yaml.
`kubectl delete pvc mongodb-data-mongodb-ss-0`
- add `--grace-period=0` if terminating state remains for a while

## Color-api Deployment & SVC
After creating teh color-api deployment & svc, expose the svc `minikube service color-svc`
- Creates IP Address to allow for communication with the color api pod
```
curl -X POST http://<color_svc>/api/color/primary \
     -H "Content-Type: application/json" \
     -d '{"value": "purple"}'

curl http://color-svc/api?colorKey=<string>
```
`<color_svc>` : get from `minikube service color-svc`


### Docker and Minikube redeploy image with same tag
When there's a small bug and want to quickly rebuild the docker image with the same image tag:
1. `docker rmi <image_name>:tag`
2. `kubectl delete <resource> <resource_name>`
    - Remove/Stop any resources that're currently using a pod that's running that image
3. `minikube image rm <image_name>`
    - Remove the image from minikube to prevent caching and using the old outdated image (bug will still be there if not XD)
4. Able to go through normal `docker build` & `docker push` with the same tag
5. Apply yaml files for resources stopped.
6. Image should be the same image_tag as before just without the bug

