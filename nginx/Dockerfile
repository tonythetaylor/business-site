# Frontend build stage
FROM node:20-alpine AS build
WORKDIR /app

# Copy frontend package files
COPY frontend/package*.json ./
RUN npm install

# Copy rest of frontend source
COPY frontend ./
RUN npm run build

# Nginx runtime
FROM nginx:1.27-alpine

# Remove default config and add our own
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built frontend
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
