# Build stage
FROM node:16.15.0 as build-stage
WORKDIR /app

# Copy app dependencies
COPY package*.json ./

# Download dependencies
RUN npm ci

# Copy app
COPY . .
RUN npm run build:prod

# Production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist/simple-app /usr/share/nginx/html
EXPOSE 80 443
