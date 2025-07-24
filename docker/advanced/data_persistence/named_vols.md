# Named Docker Volumes

Named volumes allow for persistence of data outside of the docker container: databases!

## Create a named volume
`docker volume create <vol_name>`

## Use named volume: bind mount
`docker run -v <vol_name>:<mount_path> <img_name>:<img_tag>`

ex nginx container:
`docker run -d -p 3000:80 --name website_main -v website-data:/usr/share/nginx/html nginx:1.27.0`
    - The named volume `website-data` is mounted to the `/usr/share/nginx/html` directory in the container

If we run multiple instances of the this nginx image and hook up to other host ports, if the data is changed in the docker volume, it will be reflected across all containers the volume is mounted to.

ex nginx:
```
docker exec -it website_main sh
echo "hello world" > /usr/share/nginx/html/index.html
```

This will open the `website_main` container and replace the `index.html` file with a "hello world". 
- Any docker container that's using the `website-data` volume, will see hello world when going to their localhost port