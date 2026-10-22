# ---- dev: Vite 개발 서버 (핫 리로드) ----
FROM node:22-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]

# ---- build: 정적 파일 생성 ----
FROM dev AS build
RUN npm test && npm run build

# ---- prod: nginx로 정적 서빙 (배포와 동일한 형태) ----
FROM nginx:1.27-alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
