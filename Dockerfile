FROM node:20-alpine AS base

WORKDIR /app

FROM base AS dependencies
COPY package*.json ./
RUN npm install

FROM base AS build
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build

FROM base AS prod
COPY --from=build /app /app
EXPOSE 3000
CMD ["npm", "start"]