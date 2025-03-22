FROM node:20

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Strapi project
RUN npm run build

# Expose the Strapi port
EXPOSE 1337

# Start Strapi
CMD ["npm", "start"]