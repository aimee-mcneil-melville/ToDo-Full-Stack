FROM mcr.microsoft.com/playwright
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
CMD ["node", "server/index.js"]