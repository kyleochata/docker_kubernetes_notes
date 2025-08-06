FROM alpine:3.20

WORKDIR /app

RUN apk add --no-cache curl

COPY traffic-gen.sh traffic-gen.sh

RUN chmod +x traffic-gen.sh

ENTRYPOINT [ "./traffic-gen.sh" ]

# anything esle after the docker run <img>:<tag> will be the args for target and time-interval
# similar to ./traffic-gen.sh localhost:8080 1 CLI