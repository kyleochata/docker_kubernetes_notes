# Liveness, Readiness, Startup Probes

Continuously monitor contaienr health 

Probes are periodic helath ch3cks performed by k8 to determine the status of a container. They allow k8 to manage the lifecycle of contaienrs by checking if they are healthy and ready to serve traffic.

## Startup Probe
Ensures that a contaienr has started successfully. If the startup probe fails, K8 will kill the container and try to restart it.

## Liveness Probe
Checks if the container is still running. If the liveness probe fails, k8 will restart the container. **Keeps executing throughout the container lifecycle**

## Readiness Probe
Checks if the container is ready to accept traffic. If the readiness probe fails, the container will be removed from the list of endpoints that can receive traffic. **Keeps executing throughout the container lifecycle**

```
spec:
    startupProbe:
        httpGet:
            path: /up
            port: 80
        failureThreshold: 3
        periodSeconds: 5
    livenessProbe:
        httpGet:
            path: /health
            port:80
        failureThreshold: 3
        periodSeconds: 10
```

`httpGet`: requires a `path` & `port` values to know where and how to get to the probe endpoint.
`failureThreshold`: number of times the probe is allowed to fail
`periodSeconds`: number of seconds between probe tries