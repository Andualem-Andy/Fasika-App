FROM node:20

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js project
RUN npm run build

# Expose the Next.js port
EXPOSE 3000

# Start Next.js
CMD ["npm", "start"]