# Annotations

Add useful information and configuration to resources

Annotations are key-value pairs attached to k8 objects (like labels). Annotations aren't supposed to store identifying metdata. Often used by tools or the k8 system itself

## Common Use Cases
1. Tool-specific Metadata and Configuration
    - External tools (montioring systems, logging agents) leverage annotations to attach custom data to resources (configurations, metrics collection endpoints, etc)

2. Configuration for Ingress Controllers
    - config ingress controllers (traffic routing, SSL termination, security settings)
    - Define path rewrites or custom load balancing rules via annotations

3. Storing Build and Version Information
    - Annotations can store metadata: timestamps, version numbers, or Git commit hashes

4. Runtime Config for Operators
    - K8 operators or controllers can use annotations to customize runtime behavior for specific resources
    - Prefix: must be a DNS subdomain
        - `nginx.ingress.kubernetes.io`
    - Name: < 63 characters, alphanumeric, dots, underscore & dashes ok.
        - `proxy-body-size`
    - Prefix/name --> `nginx.ingress.kubernetes.io/proxy-body-size`