`echo -n "string" | base64`

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
curl -X POST http://<IP_From_minikube_cmd>/api/notebooks \
     -H "Content-Type: application/json" \
     -d '{"name": "notebook_1", "description":"first notebook"}'
```
http://127.0.0.1:64756

curl -X POST http://127.0.0.1:64756/api/color/primary \
     -H "Content-Type: application/json" \
     -d '{"value": "purple"}'


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

