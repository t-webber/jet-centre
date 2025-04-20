FROM node:22-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN apt update -y && apt install -y openssl

RUN npm install --omit=dev

COPY . .

RUN npx prisma generate

# --- Production Image ---
FROM node:22-alpine

WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/prisma ./prisma

EXPOSE 5005
