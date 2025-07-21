FROM node:22

# Creates the /app dir within the node base image
WORKDIR /app

# Copy package.json and package-lock.json
# * after package will copy the '-lock' aswell
COPY package*.json .
# Install dependencies
# ci - clean install. Safer and more predictable way of download dependencies
RUN npm ci
# Copy source code of app
# copy content of 'src/index.js' to '/app/index.js'
COPY src/index.js index.js
# Expose application port
EXPOSE 3000
# Start application
CMD [ "node", "index.js" ]