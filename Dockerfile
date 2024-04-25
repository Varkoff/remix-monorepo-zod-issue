# https://www.tomray.dev/nestjs-docker-production
# BUILD FOR PRODUCTION
FROM node:20-alpine As base

ENV NODE_ENV="production"

FROM base AS builder

# FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
# RUN apk update
# Set working directory
WORKDIR /app
RUN npm install --global turbo

COPY --chown=node:node . .
RUN turbo prune @virgile/frontend --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer

COPY ./package*.json ./
COPY ./frontend/package*.json ./frontend
COPY ./packages/shared/package*.json ./packages/shared

WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --chown=node:node --from=builder /app/out/json/ .
COPY --chown=node:node --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm install --include=dev
# --frozen-lockfile

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

ARG TURBO_TEAM
ENV TURBO_TEAM=$TURBO_TEAM

ARG TURBO_TOKEN
ENV TURBO_TOKEN=$TURBO_TOKEN

RUN cat package.json
RUN npm run build

FROM base as prunner
WORKDIR /app

COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/node_modules/@virgile/frontend ./node_modules/@virgile/frontend
COPY --from=installer /app/node_modules/@virgile/shared ./node_modules/@virgile/shared
COPY ./package*.json ./
COPY ./frontend/package*.json ./frontend
COPY ./packages/shared/package*.json ./packages/shared

RUN npm prune --omit=dev

FROM base AS runner
WORKDIR /app
    
# Don't run production as root
RUN addgroup --system --gid 1024 nodejs
RUN adduser --system --uid 1024 remix-api

USER remix-api

COPY --chown=remix-api:nodejs --from=builder /app/frontend/start.sh ./frontend/start.sh
COPY --chown=remix-api:nodejs --from=prunner /app/node_modules ./node_modules

COPY --chown=remix-api:nodejs --from=prunner /app/node_modules/@virgile/frontend ./node_modules/@virgile/frontend
COPY --chown=remix-api:nodejs --from=prunner /app/node_modules/@virgile/shared ./node_modules/@virgile/shared

ENTRYPOINT [ "frontend/start.sh" ]