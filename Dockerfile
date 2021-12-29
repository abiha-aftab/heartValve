# Builds the static site with Gatsby, then serves it with nginx as a
# non-root user on port 8080.
#
# Offline fixtures (default):  docker build -t yourheartvalve .
# Live Kontent content:        docker build -t yourheartvalve \
#   --build-arg KONTENT_OFFLINE= \
#   --build-arg GATSBY_KONTENT_PROJECT_ID=<project id> \
#   --build-arg GATSBY_KONTENT_LANGUAGE_CODENAMES=default,de .

FROM node:22-bookworm AS build
WORKDIR /app
ENV GATSBY_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
ARG KONTENT_OFFLINE=1
ARG GATSBY_KONTENT_PROJECT_ID
ARG GATSBY_KONTENT_LANGUAGE_CODENAMES
ARG GATSBY_DELIVERY_API_URL
RUN npx gatsby build

FROM nginx:1.30-alpine
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build --chown=nginx:nginx /app/public /usr/share/nginx/html
USER nginx
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
