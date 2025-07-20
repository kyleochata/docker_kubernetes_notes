Containers vs Virtualization

Virtualization
1. Hardware infrastructure
2. Host operating system
3. Hypervisor - most important part
    a. Enables for side by side running of VMs
    b. Hyperviser acts as the translator that translates cmds and instructions from the guest OS to the host OS
    c. Ensures resource allocation, proper isolation b/w VMs
4. VM - Guest OS + Dependencies (Deps) + Code

Containers 
1. Hardware infrastructure
2. Host OS
3. Container Engine
    a. Manages the Containers
4. Container - Deps + Code
    a. No additional guest OS -> faster and linear operating containers
    b. Lose isolation due to all running in the container engine
    c. Can enable isolation rules to mitigate the isolation issue


![VM versus Container](../img/VM_vs_Container_Model.png)

Isolation:
    a) VMs - strong isolation: each VM has own OS providing complete isolation
    b) Container - Process-level isolation: contianers shsre the host OS kernel

Size/Overhead:
    a) VMs - Larger: due to the guest OS and virtual hardware
    b) Container - Lightweight: minimal overhead, due to sharing the kernel

Portability:
    a) VMs - Less portable: due to being tied to specific hypervisors and guest OS configs
    b) Container - Highly portable: platform-agnostic and run consistently

When to Use:
    VMs:
    - Strong isolation needed between environments
    - Dealing with legacy apps that might not easily containerized
    - Replicate a complete system environment for testing or dev

    Containers:
    - Building modern, cloud-native apps using microservices architecture
    - Need to scale apps quickly and efficiently
    - Portability across different environments is a top priority