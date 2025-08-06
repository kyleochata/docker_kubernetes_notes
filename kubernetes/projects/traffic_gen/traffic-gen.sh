#!/bin/sh
# if arguments is less than 2, arg1 = TARGET(url to curl); arg2 = interval b/w curls

if [ "$#" -lt 2 ]; then
    echo "Usage: $0 <target> <interval-in-seconds>"
    exit 1
fi

TARGET=$1
INTERVAL=$2

echo "Sending requests to $TARGET every $INTERVAL seconds"

# every $INTERVAL seconds send a curl request to $TARGET and timestamp it
while true; do
    REQUEST_TIME=$(date +"%Y-%m-%d %H:%M:%S")
    RESPONSE=$(curl -s "$TARGET")

    echo "[$REQUEST_TIME] $RESPONSE"
    sleep $INTERVAL
done