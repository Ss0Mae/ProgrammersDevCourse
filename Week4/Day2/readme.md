# Map 안에 객체를 저장해보자

![](https://velog.velcdn.com/images/ssomae/post/10a1d06a-2168-4da3-ba85-f9cdf0794641/image.png)


```jsx
let db = new Map();
let notebook = {
    productName: "Notebook",
    pricel : 2000000
}

let cup = {
    productName: "Cup",
    pricel : 3000
}

let chair = {
    productName: "Chair",
    pricel : 100000
}

let poster = {
    productName: "Poster",
    pricel : 20000
}
db.set(1, notebook); // key- value
db.set(2, cup);
db.set(3, chair);
db.set(4, poster);

console.log(db);
console.log(db.get(1));
console.log(db.get(2));
console.log(db.get(3));
console.log(db.get(4));
```

# 해당 객체를 이용해 get 메서드 리팩토링 해보기

```jsx
app.get('/:id', function (req, res) {
    let { id } = req.params
    id = parseInt(id);

    if (db.get(id) == undefined) {
        res.json({
            message: "없는 상품입니다"
        })
    } else {
        product = db.get(id);
        product['id'] = id;
        res.json(product);
    }
})
```

---

# 유튜버 실습을 express와 map을 이용해 리팩토링 해보기

```jsx
const express = require('express');
const app = express();

app.listen(1234);

let youtuber1 = {
    channelTitle: "십오야",
    subscriber: "593만명",
    videoNum: "993개"
}

let youtuber2 = {
    channelTitle: "침착맨",
    subscriber: "227만명",
    videoNum: "6600개"
}

let youtuber3 = {
    channelTitle: "테오",
    subscriber: "100만명",
    videoNum: "1100개"
}

let db = new Map();
db.set(1, youtuber1);
db.set(2, youtuber2);
db.set(3, youtuber3);

app.get('/youtuber/:id', function (req, res) {
    let { id } = req.params;
    id = parseInt(id);
    //console.log(id);
    if (db.get(id) === undefined) {
        res.json({
            message: "Wrong Access"
        })
    } else {
        res.json(db.get(id));
    }
})

```

---

# Express의 구조 간단하게 이해해보기

- 익스프레스는 프레임워크다.
    - 프레임워크는 필요한 라이브러리를 모두 다 틀 안에 넣어둔다.

```jsx
> sudo npm install express-generator -g
> express
```

- 빈 폴더에서 해당 명령어를 입력하면 기본 틀이 생성된다.

![](https://velog.velcdn.com/images/ssomae/post/60d09466-c123-4472-93f3-b5734fe45cd0/image.png)


### `bin/www`

- **역할**: 이 파일은 애플리케이션의 진입점입니다. 서버를 실행하는 코드가 이 파일에 들어 있으며, HTTP 서버를 생성하고 포트를 설정하는 등의 작업이 이루어집니다.
- **상세 내용**:
    - 서버가 시작되면서 `app.js` 파일에서 설정된 Express 애플리케이션을 가져와서 실행합니다.
    - 포트 번호는 기본적으로 3000번으로 설정되어 있으며, 이 포트에서 서버가 동작하게 됩니다.

### 2. `public`

- **역할**: 정적 파일(예: 이미지, CSS 파일, JavaScript 파일 등)을 제공하는 디렉토리입니다.
- **상세 내용**:
    - 이 디렉토리의 파일들은 `/public` 경로를 통해 클라이언트에게 직접 제공됩니다.
    - 예를 들어, `public/stylesheets/style.css` 파일은 브라우저에서 `/stylesheets/style.css`로 접근할 수 있습니다.

### 3. `routes`

- **역할**: 애플리케이션의 라우트 핸들러가 위치하는 곳입니다. 라우트는 사용자가 요청한 URL에 따라 다른 기능을 수행하게 합니다.
- **상세 내용**:
    - `index.js`: 기본 경로 `/`에 대한 라우트를 정의합니다. 보통 홈 페이지나 기본 라우트를 처리합니다.
    - `users.js`: `/users` 경로에 대한 라우트를 정의합니다. 사용자 관련 기능이 여기에 구현될 수 있습니다.

### 4. `views`

- **역할**: 뷰 템플릿 파일이 위치하는 디렉토리입니다. Express는 뷰 엔진을 통해 HTML을 렌더링할 수 있으며, 기본적으로 Jade(현재 Pug로 명칭 변경됨) 템플릿 엔진을 사용합니다.
- **상세 내용**:
    - `error.jade`: 에러 페이지를 렌더링할 때 사용됩니다.
    - `index.jade`: 기본 홈 페이지를 렌더링할 때 사용됩니다.
    - `layout.jade`: 다른 뷰들이 공통으로 사용할 레이아웃을 정의합니다. 헤더나 푸터와 같은 공통 요소를 여기에 정의합니다.

### 5. `app.js`

- **역할**: Express 애플리케이션의 주요 설정 파일입니다. 미들웨어 설정, 라우트 설정, 오류 처리기 등이 여기에 정의됩니다.
- **상세 내용**:
    - `express` 모듈을 가져와 애플리케이션 인스턴스를 생성합니다.
    - `app.use`를 통해 미들웨어를 설정하고, 라우트와 뷰 엔진을 설정합니다.
    - 여기서 정의된 설정들이 `bin/www` 파일에서 실행되어 애플리케이션을 동작하게 합니다.

### 6. `package.json`

- **역할**: 프로젝트의 메타데이터가 저장된 파일로, 애플리케이션에 필요한 의존성(dependencies)과 스크립트, 이름, 버전 정보 등이 포함됩니다.
- **상세 내용**:
    - `dependencies` 섹션에는 애플리케이션이 필요로 하는 npm 패키지들이 나열됩니다.
    - `scripts` 섹션에는 `npm start` 명령어로 서버를 시작하는 스크립트가 정의될 수 있습니다