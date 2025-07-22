#=== Start Single stage =====
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
#COPY src/index.js index.js
COPY . .

# set environment variable PORT to 5000 at runtime
ENV PORT=8080

# Expose application port
EXPOSE 8080
# Start application
CMD [ "node", "src/index.js" ]
# #=== End Single Stage ===

# Multistage
# FROM node:22-alpine AS build
# WORKDIR /app
# COPY package*.json .
# RUN npm ci

# FROM gcr.io/distroless/nodejs22 
# WORKDIR /app
# COPY --from=build /app/node_modules node_modules
# COPY src src
# ENV PORT=3000
# CMD [ "src/index.js"]