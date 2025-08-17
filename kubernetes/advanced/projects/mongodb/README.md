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