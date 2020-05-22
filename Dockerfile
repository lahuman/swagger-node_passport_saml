# build environment
FROM node:12.2.0-alpine as build

# 앱 디렉터리 생성
WORKDIR /usr/src/app

COPY . .

RUN apk --no-cache add tzdata && \
        cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
        echo "Asia/Seoul" > /etc/timezone

RUN npm install --unsafe-perm

ENV NODE_ENV DEV
EXPOSE 10010
CMD ["npm", "run", "start"]
