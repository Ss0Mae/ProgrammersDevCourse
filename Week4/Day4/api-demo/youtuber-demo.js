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

app.get('/youtubers', function (req, res) {
    let start = 0;
    db.forEach(function (youtuber) {
        console.log(youtuber);
    })

    let jsonObject = {};
    db.forEach(function (value, key) {
        jsonObject[key] = value;
    });
    res.json(jsonObject)
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
