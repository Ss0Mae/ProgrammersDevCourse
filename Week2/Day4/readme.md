# 백엔드의 구조

![](https://velog.velcdn.com/images/ssomae/post/14f87adb-8f4e-4111-aaca-7839d2c21a45/image.png)

- 웹 서버는 정적 페이지에 대해 대응한다.
- 동적 페이지에 대한 처리는 직접 처리하지 않고, 웹 어플리케이션 서버에게 전달한다.
- 정적 페이지는 화면의 내용/데이터 등의 변동이 없는 페이지
- 동적 페이지란, 데이터 처리/연산을 통해 화면의 내용, 데이터가 변하는 페이지를 말한다.

---

- 웹 어플리케이션 서버는 동적 페이지를 처리한다.
- 필요한 데이터 연산을 위해 데이터베이스와 연결되어 있다.

# 백엔드 관련 학습 내용 정리

## 1. 백엔드의 구조

- **백엔드**의 기본 구조와 구성 요소에 대한 이해.
- 서버, 데이터베이스, API, 인증 시스템 등의 역할과 이들 간의 상호작용.
- 백엔드 아키텍처를 설계하는 기본 원칙.

## 2. Node.js 소개 및 설치

- **Node.js**의 개념과 특징 소개.
- Node.js의 비동기 I/O 모델과 **JavaScript 런타임**으로서의 역할.
- Node.js 설치 방법 및 환경 설정.

## 3. Node.js로 웹서버 만들기

- Node.js를 사용하여 **기본 웹 서버**를 구축하는 방법.
- HTTP 모듈을 활용해 요청(request)과 응답(response)을 처리하는 방법.
- 간단한 서버 예제 코드 작성.

## 4. HTTP 템플릿

- **HTTP 프로토콜**의 구조와 역할 이해.
- 요청(request)과 응답(response)의 구조와 주요 헤더.
- 서버와 클라이언트 간의 통신 과정에서 HTTP가 어떻게 활용되는지 학습.

## 5. server.js 모듈화

- **모듈화**를 통해 Node.js 코드의 재사용성과 관리성을 높이는 방법.
- `server.js` 파일을 여러 모듈로 분리하고, 이를 조합하여 서버를 구성하는 방법.
- 모듈을 정의하고 불러오는 기본 패턴.

## 6. URL 읽어내기

- Node.js에서 **URL**을 분석하고 처리하는 방법.
- `localhost:8888/` 뒤에 오는 경로를 파싱한다.
- URL을 파싱하여 요청된 경로와 쿼리 매개변수를 추출하는 기술.
- 요청 URL에 따라 서버의 동작을 다르게 설정하는 방법.

## 7. URL에 따라 다른 콘솔 찍기 (아직 백엔드만 구별)

- 요청된 **URL 경로에 따라** 서로 다른 로그를 출력하는 방법.
- 기본적인 라우팅을 구현하여 URL에 따른 서버의 반응을 다르게 설정.
- 서버가 처리하는 요청의 유형을 구별하고 이에 따라 다른 행동을 수행하는 방법.

## 8. URL에 따라 프론트엔드에 다른 response 보내기

- **URL 경로에 따라** 서로 다른 응답(response)을 프론트엔드로 전송하는 방법.
- 라우팅을 통해 각 URL 요청에 대해 다른 HTML, JSON, 또는 기타 응답을 제공.
- 클라이언트의 요청에 따라 서버가 맞춤형 응답을 처리하는 예제.

---

## 실습 화면 캡쳐본

![](https://velog.velcdn.com/images/ssomae/post/0ca98c7b-a6cd-4378-9035-51f1a97e704a/image.png)


```jsx
function main(response) {
    console.log('main');
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write('Jo SeongMin');
    response.end();
}

function login(response) {
    console.log('login');
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write('login page');
    response.end();
}

let handle = {};
handle['/'] = main;
handle['/login'] = login;

exports.handle = handle;
```

![](https://velog.velcdn.com/images/ssomae/post/a7ee247e-e18f-4126-96f3-8fa211021d9c/image.png)
