FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build:widget

FROM nginx:1.27-alpine AS runtime

RUN apk add --no-cache wget

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/cargo-calculator/browser /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/health || exit 1
