# Docker Images

## Understanding the DNA of our containers

Images are self-contained, read-only template that encapsulates everything needed to run your app:

1. Base Layer
- often a minimal Linux distribution like Alpine or a full-fledged one like Ubuntu

2. Runtime Environment
- specific software (e.g Python, Node.js) required by your app

3. Libraries & Dependencies
- All external code app relies on

4. Applicaton Code
- source code or compiled binaries(Go)

5. Configuration
- Settings for the app and its environment

### Docker images are like a snapshot of your app and its complete runtime environment, frozen in time and ready to be brout to life into a container

Images can be sources from multiple locations:
- Docker Hub: official docker repo
- Private Registries
- Building your own images through Dockerfiles