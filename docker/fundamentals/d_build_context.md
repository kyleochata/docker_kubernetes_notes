# `.`: Docker build context & `.Dockerignore`

## Docker Build Context

`docker build -t <image_name> <context>`

- The `.` we normally put after the image_name specifies the `<context>` of all for Docker. 
    - Signals for all files, directories and sub-directories to be used by the Docker Daemon when building the image
    - All context is uploaded to the Docker Host from the Docker CLI 
    - Docker Host is responsible for building the image, may be separated from the Docker CLI initiating the `build` cmd

```
 => [internal] load .dockerignore
 => => transferring context: 2B  
```

`mkfile -n 5g some-large-file`

- By having large/heavy files or directories, can use a `.dockerignore` file to prevent the upload to keep the image small if it's not needed (i.e: node_modules, .env files, etc)

after doing `docker build <name> .` it'll include that 5g file and take awhile.

## .Dockerignore File

The `.dockerignore` file works like a gitignore and you can put files, directories, file_extensions that you don't want to be included in the build context. The `.dockerignore` file is always loaded before the context is transferred as the code block above shows


`**/*.<file_extension>`
- Way to ignore any type of files in any directory or sub-directory

**After `docker build` to check if the files were ignored, `docker run --rm -it <image_id> sh`**
- Creates a container based off of the `<image_id>` and opens up a shell terminal. 
- This will override any CMD in the Dockerfile 
    - `CMD ["node", "index.js"]` was the final cmd in our express_app dockerfile used to launch the express server
    - Instead it will only open the shell teminal and we won't get the normal express server lsitening message

