FROM mcr.microsoft.com/playwright
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
RUN npm run build
# RUN chmod +x ./wait-for-it.sh