## express/index.js 에서 기초 파일 확인

```jsx
const express = require('express')
const app = express()

// Get Method + "/"
app.get('/', function (req, res) {
  res.send('Hello World')
})

// API : GET + "http://localhost:1234/test"
// TEST SUCCESS
app.get('/test', function (req, res) {
  res.send('TEST SUCCESS')
})

// API : GET + "http://localhost:1234/test/1"
// ONE
app.get('/test/1', function (req, res) {
  res.send('ONE!')
})

//API : GET /hello, /bye, /nicetomeetyou
app.get('/hello', function (req, res) {
    res.send("HELLO")
})

app.get('/bye', function (req, res) {
    res.send("bye")
})

app.get('/nicetomeetyou', function (req, res) {
    res.send("nicetomeetyou")
})

//GET 메소드로, /url 주소가 날라오면
// 매개변수로 전달받은 콜백 함수를 호출하겠어 => 서버에 셋팅
app.listen(1234)
// 서버 셋팅: 포트 넘버 1234로 셋팅
```

---

<aside>
📌

두 줄 이상 작성하면 전송받지 못하는 문제가 있음 → 객체로 저장해서 뭉탱이로 보내자 `JSON` 파일에

</aside>

```jsx
app.get('/product/1', function (req, res) {
    res.send('Node.js를 배워보자 (책)');
    res.send('20000');
})
```

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/5428f7b2-4294-48af-83a5-0dbce4a61e51/b4a150ed-631a-4957-bb6d-128cb812bfa3/image.png)

## JSON이란

<aside>
📌

JavaScript Object Notation, 데이터를 저장하거나 전송할 때 많이 사용되는 경량의 DATA 형식

</aside>

```jsx
let book = {
	title : 'Node.js를 공부해 보자',
	price: 20000,
	description: '좋은책이다'
};
```

```jsx
const express = require('express')
const app = express()

// 서버 셋팅: 포트 넘버 1234로 셋팅
app.listen(1234)

//GET 메소드로, /url 주소가 날라오면
// 매개변수로 전달받은 콜백 함수를 호출하겠어 => 서버에 셋팅

app.get('/product/:n', function (req, res) {
    // : => URL로 매개변수를 전달해줄 건가보다.
    // req.params
    // product/_ 빈칸에 오는 값을 n이라는 변수에 담아줘

    // console.log(req.params);
    // console.log(req.params.n);
    res.json({
        num: req.params.n
    })
})
```

# Node.js 기본 생태계

Node.js는 JavaScript를 서버 측에서 사용할 수 있게 해주는 런타임 환경이다. 

이 환경을 중심으로 형성된 생태계는 매우 활발하며, 개발자가 서버 애플리케이션을 효율적으로 구축, 배포, 관리할 수 있도록 다양한 도구와 패키지를 제공한다. 

## 1. Node.js

- **런타임 환경**: Node.js는 V8 JavaScript 엔진을 기반으로 하며, 이를 통해 JavaScript를 브라우저 외부, 특히 서버 환경에서 실행할 수 있습니다.
- **비동기 I/O**: Node.js는 비동기식 I/O 모델을 채택하여 높은 성능과 확장성을 제공합니다. 이 덕분에 많은 동시 연결을 효율적으로 처리할 수 있습니다.

## 2. NPM (Node Package Manager)

- **패키지 매니저**: NPM은 Node.js 패키지 생태계를 관리하는 도구로, 프로젝트에서 필요한 라이브러리나 툴을 쉽게 설치하고 관리할 수 있게 해줍니다.
- **NPM 레지스트리**: 전 세계 개발자들이 공유하는 오픈 소스 패키지를 중앙 저장소에서 관리하며, 다양한 모듈과 도구를 쉽게 검색하고 사용할 수 있습니다.
- **스크립트 관리**: NPM을 통해 프로젝트의 빌드, 테스트, 배포 등의 작업을 스크립트로 정의하고 실행할 수 있습니다.

## 3. 패키지 관리와 모듈화

- **모듈 시스템**: Node.js는 CommonJS 모듈 시스템을 사용하여 파일 단위로 코드를 분리하고, `require` 키워드를 사용해 모듈을 불러옵니다.
- **ES 모듈**: 최신 Node.js 버전에서는 ECMAScript 모듈 시스템(ESM)도 지원하며, `import`와 `export` 키워드를 사용해 모듈을 관리할 수 있습니다.

## 4. 주요 프레임워크 및 라이브러리

- **Express**: Node.js에서 가장 널리 사용되는 웹 프레임워크로, 간단하고 유연한 API를 제공하여 서버 애플리케이션을 쉽게 구축할 수 있습니다.
- **Koa**: Express의 창시자가 만든 차세대 웹 프레임워크로, 미들웨어 구조를 단순화하고 현대적인 JavaScript 기능을 활용하도록 설계되었습니다.
- **NestJS**: TypeScript로 작성된 Node.js 프레임워크로, 대규모 애플리케이션을 구축하는 데 유용한 모듈, 디코레이터, 의존성 주입 등을 제공합니다.