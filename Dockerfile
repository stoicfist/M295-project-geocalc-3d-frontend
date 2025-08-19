# Angular Build Stage
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --configuration production --project geocalc3d-frontend

# Nginx Stage
FROM nginx:alpine
COPY --from=builder /app/dist/geocalc3d-frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
