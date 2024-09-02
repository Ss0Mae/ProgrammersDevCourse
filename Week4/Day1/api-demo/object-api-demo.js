const { application } = require('express')
const express = require('express')
const app = express()

// 서버 셋팅: 포트 넘버 1234로 셋팅
app.listen(1234)

//채널 주소 https://www.youtube.com/@15ya.fullmoon
//채널 주소 https://www.youtube.com/@ChimChakMan_Official

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

app.get('/:nickname', function (req, res) {

    const { nickname } = req.params;
    if (nickname === "@15ya.fullmoon") {
        res.json(youtuber1);
    }else if (nickname === "@ChimChakMan_Official") {
        res.json(youtuber2);
    }else if (nickname === "@TEO_universe") {
        res.json(youtuber3);
    } else {
        res.json({
            message: "FIND ERROR"
        })
    }

    
})



