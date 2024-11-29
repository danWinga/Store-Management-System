# Use Node.js as base
FROM node:16-alpine

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy source code
COPY . .

# Build the app
RUN yarn build

# Serve the app using a lightweight server
RUN yarn global add serve
CMD ["serve", "-s", "dist"]

EXPOSE 5000
