FROM node:26-slim
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]
