
FROM oven/bun:latest AS base
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM base AS builder
COPY . .
RUN bun run build

FROM oven/bun:latest AS runner
WORKDIR /app

COPY --from=builder /app/public ./public 
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["bun", "server.js"]