FROM node:18-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Simplified healthcheck setup without jq
RUN npm install axios && \
    echo 'const axios = require("axios"); axios.get("http://localhost:3000").catch(() => process.exit(1));' > healthcheck.js && \
    echo '{"scripts":{"healthcheck":"node healthcheck.js"}}' > package.health.json && \
    node -e "const fs=require('fs');const pkg=require('./package.json');const health=require('./package.health.json');fs.writeFileSync('./package.json', JSON.stringify({...pkg, ...health},null,2));" && \
    rm package.health.json

EXPOSE 3000

CMD ["npm", "run", "start"]