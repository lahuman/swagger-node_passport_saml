# Skeleton project for Swagger

## 준비 내역

swagger 설치

기본적으로 설치 해야 합니다.

```
$> npm install -g swagger
```

SAML 연동을 위한 설정을 **lib/passport.js** 에 설정합니다.

```
const config = {
  strategy: "saml",
  saml: {
    path: "/login/callback",
    entryPoint:
      "https://ssourl/auth/realms/lahuman/protocol/saml/clients/saml-test",
    issuer: "saml-test",
    privateCert: fs.readFileSync("path/client-private-key.pem", "utf-8"),
    signatureAlgorithm: "sha256",
  },
};
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
