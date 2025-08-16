# Headless Services

Headless Services are used for directly communicating with pods.
- Doesn't provide loadbalancing or a single stable IP address (normal svc)

Returns the IP addresses of all the pods that're associated with the svc allowing for direct pod-to-pod communication.
- Created by setting `clusterIP: None` in svc definition
- Doesn't have a cluster IP assigned
- DNS returns all pod IPs (A records) instead of a single service IP
- Each pod gets its own DNS record in the following format: `<pod_name>.<svc_name>.<namespace>.svc.cluster.local`


**Headless services allows for targeting specific pods, crucial for stateful apps where the need to talk to specific instances arises**
- Stable DNS (Domain Name System) entry point to talk to specific pods.
    - DNS human-readable domain names into machine-readable IP addresses (ex: google.com --> 172.217.3.110)

## LAB: Headless service
1. `kubectl apply -f .`
2. `kubectl get pv,pvc,pod`
- Ensure all resources are up, bound
3. `kubectl exec -it curl -- sh`
4. `curl color-ss-0.color-svc`
- Follows the `<ss_name-{ordinal_num}>.<headless_svc>`
5. `curl color-svc`
- This seems to direct randomly between the 3 pods associated with the headless svc
6. `curl color-ss-0.color-svc.default.svc.cluster.local`
- Talk to a specific pod (`color-ss-0`) in a specific namespace (`default`)

Sometimes the svc won't pickup the ss-Pods. Delete svc and ss and try to create the svc first followed by the ss.
- Order matters sometimes?
<!--  -->