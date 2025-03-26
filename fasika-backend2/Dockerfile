FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy Strapi files
COPY . .

# Build for production
RUN npm run build

# Add healthcheck script
RUN echo '{"scripts":{"healthcheck":"node -e \"require('axios').get('http://localhost:1337/admin').catch(()=>process.exit(1))\""}}' > package.health.json && \
    jq -s '.[0] * .[1]' package.json package.health.json > package.tmp.json && \
    mv package.tmp.json package.json && \
    rm package.health.json

EXPOSE 1337

CMD ["npm", "run", "start"]