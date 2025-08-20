# Create Users & Configure Access Credentialsß
Generate Users from scratchß

## Creating private keys for User
- `openssl --version`: ensure that openssl is installed.
- `openssl genrsa -out <key_name>.key <size>`
    - `genrsa`: generate rsa key
    - `<size>`: 2048 is the default value.
    - `-out <key_name>.key`: outputs the rsa into a `.key` file
    - `openssl genrsa -out alice.key 2048`
        - Creates a key that the user "alice" will use along with a certificate to authenticate requests

## Create new certificate signing request
`openssl req -new -key <key_name>.key -out <crt_name>.csr -subj "<Group_&_nameofUser>"`
- `-subj "/CN=<user_name>/O=<group_name>"`

ex:
1. `openssl req -new -key alice.key -out alice.csr -subj "/CN=alice/O=admin"`
    - Sets certificate's user to "alice" using the alice.key and giving the cert the group of admin
        - `openssl x509 -noout -text -in '<users.user.client-certificate>'` will show the `Certificates.Data.Subject` = `CN=alice,O=admin`
2. `openssl req -new -key bob.key -out bob.csr -subj "/CN=bob/O=dev"`
    - Uses the bob.key to create the certificate with the username bob and group of dev

## Sign with K8 Certificate Authority
[certificate authority](./rbac_files/csr.yaml)
- `spec.request` = result of `cat alice.csr | base64 | tr -d "\n"`
    - base64 of the csr file with new lines trimmed.
    - iOS: don't include the `%` at the end.
- `kubectl get certificatesigningrequest` after apply the csr.yaml
    - Should be in a pending condition after creation.
- `kubectl certificate approve alice bob`
    - approve the certificatesigningrequest to move into a `Approved, Issued` condition status.
- `kubectl get csr <name> -o yaml`
- `kubectl get csr <name> -o jsonpath='{.status.certificate}' | base64 -d > <name>.crt`
    - Will create a certificate file that has the approved cert and private keys.
- `openssl x509 -noout -text -in '<crt_name>.crt'`
    - `Certificate.Data.Subject` will have the what was set in the `-subj` from the openssl csr file command.

## Assign user and certs to cluster
`cat ~/.kube/config`: location of the kube-config file.
- Contains the context for cluster and users
1. Set context to users created.
- `kubectl config set-context <context_name> --cluster  <cluster_name> --user <user_name>`
- `kubectl config set-context alice --cluster minikube --user alice`
2. creates a user in kubeconfig
- `kubectl config set-credentials alice --client-key $(realpath alice.key) --client-certificate $(realpath alice.crt)`