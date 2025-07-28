source .env.db

# Connectivity
source .env.network
LOCALHOST_PORT=3000       
CONTAINER_PORT=3000

BACKEND_IMG_NAME="key-value-backend"
BACKEND_DOCKERFILE="backend/dockerfile.dev"
BACKEND_CONTAINER_NAME="backend"


# Container check
if [ "$(docker ps -q -f name=$BACKEND_CONTAINER_NAME)" ]; then
    echo "A container with the name $BACKEND_CONTAINER_NAME, already exists"
    echo "The contianer will be removed when stopped"
    echo "To stop the container: docker kill $BACKEND_CONTAINER_NAME" 
    exit 1
fi

# Image creation
docker build -t "$BACKEND_IMG_NAME" \
    -f "$BACKEND_DOCKERFILE" \
    backend     # context we need is just the backend dir


# Container creation with connection to network, volume, and initialization bind-mount
# -v is the bind-mount to allow for nodemon's hot-reloading
docker run -d --rm  --name "$BACKEND_CONTAINER_NAME" \
    -e KEY_VALUE_DB="$KEY_VALUE_DB" \
    -e KEY_VALUE_USER="$KEY_VALUE_USER" \
    -e KEY_VALUE_PASSWORD="$KEY_VALUE_PASSWORD" \
    -e PORT=$CONTAINER_PORT \
    -e MONGODB_HOST="mongodb" \
    -v ./backend/src:/app/src \
    -p "$LOCALHOST_PORT":"$CONTAINER_PORT" \
    --network "$NETWORK_NAME" \
    "$BACKEND_IMG_NAME"    
    