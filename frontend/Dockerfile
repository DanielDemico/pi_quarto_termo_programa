# --- Stage 1: Builder ---
FROM node:20-alpine AS builder

WORKDIR /app

COPY pi_front/package*.json ./
COPY pi_front/tsconfig.json ./         
COPY pi_front/tailwind.config.js ./    
COPY pi_front/postcss.config.mjs ./postcss.config.mjs
COPY pi_front/next.config.ts ./

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
COPY --from=builder /app/next.config.ts ./

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
