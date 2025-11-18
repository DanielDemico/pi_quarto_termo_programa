# --- Stage 1: Builder ---
FROM node:20-alpine AS builder

WORKDIR /app

COPY pi_front/package*.json ./

RUN npm ci

COPY pi_front/ .

RUN npm run build

# --- Stage 2: Runner ---
FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
