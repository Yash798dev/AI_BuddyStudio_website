# Stage 1: Build Angular app
FROM node:18-alpine AS build
WORKDIR /webapp

COPY package*.json ./
RUN npm install

COPY . .
RUN npx ng build --configuration production

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /webapp/dist/webapp/browser/ /usr/share/nginx/html/

RUN chown -R nginx:nginx /usr/share/nginx/html && chmod -R 755 /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
