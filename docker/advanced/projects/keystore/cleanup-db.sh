# Stop and remove containers
source .env.network
source .env.db 
source .env.volume



if [ "$(docker ps -aq -f name=$DB_CONTAINER_NAME)" ]; then
    echo "Removing container: $DB_CONTAINER_NAME"
    docker kill $DB_CONTAINER_NAME # && docker rm -f $DB_CONTAINER_NAME # Second part if no --rm on docker run
else
    echo "No container with the name $DB_CONTAINER_NAME exists. Skipping container deletion"
fi

if [ "$(docker volume ls -q -f name=$VOLUME_NAME)" ]; then
    echo "Removing volume: $VOLUME_NAME"
    docker volume rm $VOLUME_NAME
else
    echo "A volume with the name $VOLUME_NAME doesn't exist. Skipping volume rm"
fi 

if [ "$(docker network ls -q -f name=$NETWORK_NAME)" ]; then
    echo "Removing NETWORK: $NETWORK_NAME"
    docker network rm $NETWORK_NAME
else
    echo "A network with the name $NETWORK_NAME already exist. Skipping network rm"
fi 
