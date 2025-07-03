# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --production=false
COPY . .
RUN npm run build || npx tsc

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/ormconfig.ts ./ormconfig.ts
COPY --from=build /app/.env ./.env
RUN npm install --production
EXPOSE 4000
CMD ["node", "dist/server.js"]
