FROM node:20-alpine AS builder

WORKDIR /app

# Installer les dépendances
COPY package*.json ./
RUN npm ci

# Copier le reste des fichiers
COPY . .

FROM node:20-alpine AS runner

WORKDIR /app

# Copier uniquement les fichiers nécessaires
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server.js ./

ENV NODE_ENV=production
ENV PORT=5050

EXPOSE 5050

CMD ["node", "server.js"]
