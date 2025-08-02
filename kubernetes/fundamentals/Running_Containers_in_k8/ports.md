Ports within pods need to be different for each container in that pod.

When connecting to a pod, just need to know the Service's port.

```
kind: Service
metadata:
  name: notes-service
spec:
  ports:
    - port: 3001        # Frontend calls notes-service:3001
      targetPort: 8081  # Notes container
    - port: 3001        # Same port, different targetPort!
      targetPort: 3001  # Notebooks container
```

so the frontend will just `fetch(http://notes-service:3001/api/notes)` or `fetch(http://notes-service:3001/api/notebooks)`
- The frontend just needs to know what the 'public' port the backend Service is listening on.
- Once the traffic reaches the service the kube-proxy will handle getting the `/api/notes` or `/api/notebooks` to the correct container's port