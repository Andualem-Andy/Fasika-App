FROM node:18-alpine

WORKDIR /app

# Install dependencies including axios
COPY package.json package-lock.json ./
RUN npm install --production && npm install axios

# Copy Strapi files
COPY . .

# Build for production
RUN npm run build

# Simplified healthcheck setup without jq
RUN echo 'const axios = require("axios"); axios.get("http://localhost:1337/admin").catch(() => process.exit(1));' > healthcheck.js && \
    echo '{"scripts":{"healthcheck":"node healthcheck.js"}}' > package.health.json && \
    node -e "const fs=require('fs');const pkg=require('./package.json');const health=require('./package.health.json');fs.writeFileSync('./package.json', JSON.stringify({...pkg, ...health},null,2));" && \
    rm package.health.json

EXPOSE 1337

CMD ["npm", "run", "start"]