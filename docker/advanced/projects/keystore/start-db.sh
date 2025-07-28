#No spaces otherwise won't work
MONGODB_IMAGE="mongodb/mongodb-community-server"
MONGODB_TAG="7.0-ubuntu2204"
source .env.db
# Root credentials
ROOT_USER="root-user"
ROOT_PASSWORD="root-password"

# Credentials for read-write
KEY_VALUE_DB="key-value-db"
KEY_VALUE_USER="key-value-user"
KEY_VALUE_PASSWORD="key-value-password"

# Connectivity
LOCALHOST_PORT=27017       # Defualt for Mongodb 
CONTAINER_PORT=27017
source .env.network


# Storage
source .env.volume
VOLUME_CONTAINER_PATH="/data/db"

source setup.sh

# Container check
if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
    echo "A container with the name $DB_CONTAINER_NAME, already exists"
    echo "The contianer will be removed when stopped"
    echo "To stop the container: docker kill $DB_CONTAINER_NAME" 
    exit 1
fi

# Container creation with connection to network, volume, and initialization bind-mount
docker run -d --rm  --name "$DB_CONTAINER_NAME" \
    -e MONGODB_INITDB_ROOT_USERNAME="$ROOT_USER" \
    -e MONGODB_INITDB_ROOT_PASSWORD="$ROOT_PASSWORD" \
    -e KEY_VALUE_DB="$KEY_VALUE_DB" \
    -e KEY_VALUE_USER="$KEY_VALUE_USER" \
    -e KEY_VALUE_PASSWORD="$KEY_VALUE_PASSWORD" \
    -p "$LOCALHOST_PORT":"$CONTAINER_PORT" \
    -v "$VOLUME_NAME":"$VOLUME_CONTAINER_PATH" \
    -v ./db-config/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro \
    --network "$NETWORK_NAME" \
    "$MONGODB_IMAGE":"$MONGODB_TAG"
    