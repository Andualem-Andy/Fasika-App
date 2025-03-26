FROM node:18-alpine

WORKDIR /app

# Install dependencies including axios
COPY package.json package-lock.json ./
RUN npm install --production && \
    npm install axios

# Copy Strapi files
COPY . .

# Build for production
RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "start"]