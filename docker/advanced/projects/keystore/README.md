# Key-Value REST API

DOCKER, NODE, MONGODB

MongoDb version:
`mongodb/mongodb-community-server:7.0-ubuntu2204`
`docker exec -it mongodb mongosh`: get interactive shell within mongodb container 
`show dbs`: show current databases in mongo container

`use <db_name>`: switch to desired db
`show collections`: show collections within the db

Adding root credentials to mongodb server:
- Manual version. Best practice is to use a docker compose file
```
touch start-db.sh
chmod +x start-db.sh    #mark file as executable
touch cleanup-db.sh
chmod +x cleanup-db.sh
```
` -v ./db-config/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro \`
- Utilizes a bind mount to pass the `db-config.js` file to the container
- `:ro` designates the bind mount as `read-only`

Terminal commands after `start-db.sh` is created:
`docker volume create <vol_name>`
`docker network create <net_name>`
`./start-db.sh`

To connect to the container made in `./start-db.sh`:
`docker run --rm --name debugsh -it --network key-value-net mongodb/mongodb-community-server:7.0-ubuntu2204 mongosh mongodb://<user_name>:<user_password>@mongodb/key-value-db`
- anything after the image name and tag is the command wanted to run
- If there are credentials attached to the db, define it after the `mongodb://` 


Node version:
When first building the express app and trying to get it hooked up and talking to our mongodb, `mongoose` won't be able to resolve the hook up in `mongoose.connect("mongodb://mongodb/key-value-db")`. That's because the `mongodb/key-value-db` is in a container in our named network in docker. Will need a dockerfile to build the backend into a container on the same network to allow for named lookup!

API endpoints:
`POST /store`
- expects req body to container `key` and `value`
- return  `400` if not 
- If `key` already exists return `400`
- If key doesn't exist store and return `201`


`GET /store/:key`
- if key doesnt exist return `404`
- if key exists return `200` and return key-value

`PUT /store/:key`
- expects req body to contain value
- return `404` if no value in body
- if key doesn't exist return `404`
- if key exists update and return `200`

`DELETE /store/:key`
- key doesn't exist return `404`
- if key exists delete key and return `204`

`GET /health`
- returns `200` and text `up` when queried 

Steps to run:
At root of project:

Create the container, network, volume for mongodb.
```
chmod +x start-db.sh    #mark file as executable
chmod +x setup.sh
chmod +x cleanup-db.sh
./start-db.sh
```

If using manual setup rather than `start-backend.sh`
Change to `/backend`.
Create `backend` container to allow for name recognition to communicate with `mongodb` container on the `key-value-net` network.
```
docker build -t key-value-backend -f dockerfile.dev
docker run -d --network key-value-net --name backend -p 3000:3000 key-value-backend
```

If using `start-backend.sh`:
Allow executable and then create backend image and container 
```
chmod +x start-backend.sh
./start-backend.sh
```

`curl http://localhost:3000/health` should respond with `up` if backend container can communicate with the `mongodb` container.
    - `docker logs backend` should also give confirmation.

