# POST 연습해보기

```jsx
const express = require('express');
const app = express();
const port = 1234

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.post('/test', function (req, res) {
    res.send("Hello Post");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
```

- 실제 실행시 웹에서는 테스트가 안된다

![](https://velog.velcdn.com/images/ssomae/post/841bc7cf-44df-4017-a79b-07bc85e009d3/image.png)

<aside>
📌

생성(= 등록) : POST
ex) 회원가입 = 나 좀 등록해줘 = id, password, name, email, contact
개인정보들을 URL에 보낼수는 없다. 그렇기 때문에 **Body**에 숨겨서 보내야한다.

</aside>

# postman 사용해보기

![](https://velog.velcdn.com/images/ssomae/post/b0e11503-d7b9-4a08-a805-f7cc187cf334/image.png)


![](https://velog.velcdn.com/images/ssomae/post/382a1bce-3c88-409e-aca6-d1e5ccc1a5d7/image.png)


- post를 테스트할 수 있게 되었다.

# body에 숨겨져서 들어온 데이터를 화면에 출력해보기

```jsx
const express = require('express');
const app = express();
const port = 1234

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.use(express.json()); //req로 날아오는 body 값을 json으로 읽자
app.post('/test', function (req, res) {
    //body에 숨겨져서 들어온 데이터를 화면에 출력해볼까

    console.log(req.body.message); //undefined
    res.send(req.body.message);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
```

![](https://velog.velcdn.com/images/ssomae/post/095ccb78-00cb-4d00-9d52-36b0a52eeaf1/image.png)


# 유튜브 데모 업그레이드

- 기존 유튜버에 대한 api
- POST를 활용하여 유튜버 추가

## API 설계

- GET /youtuber/:id : id로 map에서 객체를 찾아서, 그 객체의 정보를 뿌려준다
    - req: [params.id](http://params.id) ← map에 저장된 key 값을 전달
    - res: map에서 id로 객체를 조회해서 전달
- POST/youtuber
    - req: **body**에 전달할 데이터를 전달받는다. (채널명, 구독자수, 비디오 개수)
    - res : “channel name님, 유튜버 생활을 응원합니다!”

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
    const youtuber = db.get(id);
    if (youtuber == undefined) {
        res.json({
            message: "Wrong Access"
        })
    } else {
        res.json(youtuber);
    }
})

app.use(express.json()); //req로 날아오는 body 값을 json으로 읽자
// http 외 무듈인 '미들웨어' : json 설정

app.post('/youtuber', function (req, res) {
    //body에 숨겨져서 들어온 데이터를 화면에 출력해볼까
    console.log(req.body); //

    //등록..? Map(db)에 저장(set)을 해야한다.
    db.set(4, req.body);
    res.json({
        message: `${req.body.channelTitle}님, 유튜버 생활을 응원합니다`
   });
})

```

- db의 아이디를 어떻게 dynamic한 방식으로 변경할 수 있을까?..
- id를 저장할 인덱스 변수를 하나 사용하자!

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
let id = 1
db.set(id++, youtuber1);
db.set(id++, youtuber2);
db.set(id++, youtuber3);

app.get('/youtuber/:id', function (req, res) {
    let { id } = req.params;
    id = parseInt(id);
    //console.log(id);
    const youtuber = db.get(id);
    if (youtuber == undefined) {
        res.json({
            message: "Wrong Access"
        })
    } else {
        res.json(youtuber);
    }
})

app.use(express.json()); //req로 날아오는 body 값을 json으로 읽자
// http 외 무듈인 '미들웨어' : json 설정

app.post('/youtuber', function (req, res) {
    //body에 숨겨져서 들어온 데이터를 화면에 출력해볼까
    console.log(req.body); //

    //등록..? Map(db)에 저장(set)을 해야한다.
    db.set(id++, req.body);
    res.json({
        message: `${req.body.channelTitle}님, 유튜버 생활을 응원합니다`
   });
})

```

## 전체 유튜버 “조회” GET/youtubers

- req : X, res : map에 존재하는 모든 정보들