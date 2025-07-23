# CMD vs ENTRYPOINT in Dockerfiles

## CMD 

Override the `CMD` in the Dockerfile in the terminal:

*Dockerfile*
`CMD ["node", "src/index.js"]`
- [dockerfile from projects/express_demo](../projects/express_basic/Dockerfile)

`docker run <img_name>:<img_tag> <CMD> <CMD_options>`

ex: `docker run <img_name> sh -c "apk add curl && curl https://localhost`
- This example will override the original `CMD ["node", "src/index.js"]` that is in the dockerfile (express app demo example)
- Instead it will open the shell terminal, add curl and curl to the localhost

## ENTRYPOINT

*Dockerfile*
```
FROM alpine:3.20

ENTRYPOINT ["echo", "hello from ENTRYPOINT in dockerfile.entrypoint"]
```

*Terminal*
```
docker run --rm entrypoint-example
hello from ENTRYPOINT in dockerfile.entrypoint

#Since ENTRYPOINT is a echo, will see everything after the <img_name> as a string
docker run -rm entrypoint-example echo "overwrite EP"
hello from ENTRYPOINT in dockerfile.entrypoint echo overwrite EP

#Overwrite original entry point with the --entrypoint flag
docker run -rm --entrypoint "echo" entrypoint-example "hello from terminal"
hello from terminal
```

- When using `ENTRYPOINT` adding additional commands after image in `docker run` will append the commands rather than overwrite the original `ENTRYPOINT` cmd.
- To overwrite `ENTRYPOINT` from the terminal, use `--entrypoint` flag with `docker run`

## Combining CMD & ENTRYPOINT

*Dockerfile*
```
FROM alpine:3.20

ENTRYPOINT ["echo"]
CMD ["Default Msg"]
```

- By combining `ENTRYPOINT` & `CMD` in the Dockerfile, it gives the container flexibility

*Terminal*
```
docker run --rm entry_cmd 
Default Msg

# Allows flexibility to only override the CMD since ENTRYPOINT is the echo cmd.
docker run --rm entry_cmd "CUSTOM"
CUSTOM
```

- By combining the `ENTRYPOINT` and `CMD` it allows for the `CMD` to be easily overwritten while retaining the intial `echo` command from `ENTRYPOINT`

`ENTRYPOINT` = Program
`CMD` = default arguments tot he program
- When both are present in the dockerfile, then any user doing `docker run <img_name> <"Overwrite">`, will only be able to overwrite the `CMD` args not the `ENTRYPOINT`

