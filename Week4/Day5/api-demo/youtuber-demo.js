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

app.get('/youtubers/:id', function (req, res) {
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
    let youtubers = {};
    if (db.size!==0) {
        db.forEach(function (value, key) {
            youtubers[key] = value;
        })
        res.json(youtubers);
    } else {
        res.status(404).json({
            message:'조회할 유튜버가 없습니다'
        })
    }
})

app.use(express.json()); //req로 날아오는 body 값을 json으로 읽자
// http 외 무듈인 '미들웨어' : json 설정

app.post('/youtubers', function (req, res) {
    //body에 숨겨져서 들어온 데이터를 화면에 출력해볼까
    console.log(req.body); //
    const channelTitle = req.body.channelTitle;
    if (channelTitle) {
         //등록..? Map(db)에 저장(set)을 해야한다.
        db.set(id++, req.body);
        res.json({
            message: `${req.body.channelTitle}님, 유튜버 생활을 응원합니다`
         });   
    } else {
        res.status(400).json({
            message:'요청 값을 제대로 보내주세요'
        })
    }
})

app.delete('/youtubers/:id', function (req, res) {
    let { id } = req.params;
    id = parseInt(id);
    let youtuber = db.get(id);

    if (youtuber) {
        res.status(404).json({
            message: `요청하신 ${id}번은 없는 정보입니다`
        })
    } else {
        const channelTitle =youtuber.channelTitle;
        db.delete(id);
        res.json({
            message: `${channelTitle}님 다음에 또 뵙겠습니다.`
        })
    }
    
})

app.delete('/youtubers', function (req, res) {
    // db에 값이 1개 이상이면, 전체 삭제
    // 값이 없으면 예외처리
    if (db.size >= 1) {
        db.clear();
        res.json({
            message: '전체 유튜버가 삭제되었습니다.'
        })
    } else {
        res.json({
            message: '삭제할 유튜버가 없습니다.'
        })
   }
    
})

app.put('/youtubers/:id', function (req, res) {
    let { id } = req.params;
    id = parseInt(id);

    let youtuber = db.get(id);
    let prevChannelTitle = youtuber.channelTitle
    if (youtuber) {
        res.status(404).json({
            message: `요청하신 ${id}번은 없는 정보입니다`
        })
    } else {
        let newChannelTitle = req.body.channelTitle;
        youtuber.channelTitle = newChannelTitle;
        db.set(id, youtuber);

        res.json({
            message: `${prevChannelTitle}님, 채널명이 ${newChannelTitle}로 변경되었습니다`
        })
    }
})