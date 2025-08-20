# Intro to Security in K8
Working with the default configuration shipped with minikube:
- Very permissive settings and SHOULD NOT be used in real-world clusters.
- K8 has many components & runs across multiple layers
    - Control Plane, Nodes, Network, Applications, Developers
    - All require strong security measures.

## Common Security Risks and their Causes
1. **Exposed Control Plane and API Access**
- Unauthorized access to the Kubernetes API server can comporise the entire cluster.
Common Causes:
- API server accessible over the internet without proper auth.
- Weak or default credentials being used.

2. **Insecure Workloads**
- Running containers as root or with excessive privileges can allow for privilege escalation and other attacks.
Common Causes:
- Containers running with default rootuser or running in privileged mode.
- Mounting sensitive host directories into containers via volumes.

3. **Overly Permissive Roles**
- Roles with excessive permissions can lead to data exposure if compromised.
Common Causes:
- Assigning broad permissions to users or service accounts.
- Lack of role separation and adherence to the *prinicple of least privilege*

4. **Lack of Netowrk Segmentation and Pod Isolation**
- Attackers can move laterally across services and pods once inside the network.
Common Causes:
- Default network settings allow unrestricted communication between pods.
- Absence of Netowrk Policies to control traffic flow.

5. **Unsecured Data at Rest and In Transit**
- Data stored in `etcd` or persistent volumes can be accessed if not encrypted.
Common Causes:
- Default settings without encryption enabled.
- Use of insecure communication protocols.

## Security aspects of running K8 clusters
K8 offers many constructs to tackle several of the above problems.
Some examples include, but not limited to:
1. **Role-Based Access Control (RBAC)**
- Applies the *principle of least privilege* by defining roles and binding them to specific subjects

2. **Network Policies**
- Allows for control of traffic flow between pods and network endpoints.
- Start by denying all traffic and then only allow necessary traffic to flow between Pods

3. **Encryption at Rest**
- Protect data stored in the cluster's `etcd` store and persistent volumes.

4. **Pod Security Standards (PSS)**
- Enforce, warn, or audit certain security standards on a namespace basis when creating new pods.

5. **Image Security**
- Leverage images that have as few as possible known vulnerabilities
- Swiftly accommodate security patches.