FROM node:18
WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install

COPY . . 

ENV NODE_ENV=production
RUN npm run build
RUN npm prune --omit=dev
