# Docker & Environment variables

## To set environment variables within a Dockerfile use:

`ENV <variable_name>=<value>`

This will set the environment variable to whatever value you want. This will then be able to be called within the code. For multiple env use the following structure:

```
ENV <var1>=<value1> \
    <var2>=<value2> \
    ...
```

## To call the environment variable in src:

### JavaScript / Typescript

`cosnt variable_name = process.env.<variable_name>`

### Golang

```
import os

variable_name := os.Getenv("<variable_name>")
```

### Python

```
import os 

variable_name = os.getenv("<variable_name>")
```

## Add / Edit environment variables to existing images via CLI

`docker run -e <env_variable>=<env_value> <optional flags...> <img_name>:<img_tag>`

- `-e` or `--env` flag will allow for new/override environment variables to be set to existing images.
***Caution: will lose the env variables on container removal***

### For multiple new or overiding env:
` docker run -e <env_var1>=<env_val1> -e <env_var2>=<env_var2> ...`

- `-e` or `--env` flag must appear before every new / overriding env variable

*When using strings as the value, must be in `""`*

## Using a .env file and Dockerfile:

1. Always add `.env` file to the `.dockerignore` before doing anything else
    - `**/.env*` : will exlude `.env.prod`, `.env.dev`, `env/.env.prod`, etc.

2. To reference the `.env` file, reference it in the `docker run` cmd:
    - `docker run --env-file "<file_name>" <other_flags> <img_name>:<img_tag>`

*Reminder: in a `.env` file dont need quotes around `str` values. `var` names are generally all caps*