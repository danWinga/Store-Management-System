FROM node:18 AS build
WORKDIR /app

# Configure registry
RUN npm config set registry https://registry.npmjs.org/

# Install npm@latest
RUN npm install -g npm@latest

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
