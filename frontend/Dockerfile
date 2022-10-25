FROM node:16-alpine AS prod

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=prod /frontend/dist /usr/share/nginx/html/

EXPOSE 3000

ENTRYPOINT ["nginx", "-g", "daemon off;"]