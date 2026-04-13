FROM mcr.microsoft.com/playwright:v1.58.2-jammy
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ENTRYPOINT [ "npx","cucumber-js" ]
CMD []