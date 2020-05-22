# Skeleton project for Swagger

## 준비 내역

swagger 설치

기본적으로 설치 해야 합니다.

```
$> npm install -g swagger
```

## 설치된 기본 패키지

- winston : log
- helmet : 보안 가이드 모듈
- passport : saml 연동
- express-session : session 처리

## edit OPEN

```
$> swagger project edit
```

## service start

```
$> swagger project start
```

## pm2 서비스 등록시 방법

```
$> pm2 start "npm run start" --name=hello
```
