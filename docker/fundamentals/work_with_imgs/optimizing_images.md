# Optimizing Images

[demo](../projects/optimizing_images/)

1. Use smaller base images 

When we ship production applications, we don't need development dependencies

2. [Don't include development dependencies](../projects/optimizing_images/dockerfile.deps)

2. [Use multistage builds](../projects/express_basic/dockerfile.optimize)

When the above file is compared to [this](../projects/express_basic/dockerfile.multistage), we only put the necessary dependencies for production into the distroless image along with the source code. 
- This speeds up the creation of the image and starting up new containers using this image.
- Cut down on size (220 vs 250 mb; will be more glaring in a larger projects with more dev dependencies (jest, typescript, types for packages, etc.))

