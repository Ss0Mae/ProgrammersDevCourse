const express = require('express')
const app = express()

// 서버 셋팅: 포트 넘버 1234로 셋팅
app.listen(1234)

//API : GET /hello, /bye, /nicetomeetyou
app.get('/hello', function (req, res) {
    res.json({
        say : 'HELLO'
    })
})

app.get('/bye', function (req, res) {
    res.json({
        say : 'bye'
    })
})

app.get('/nicetomeetyou', function (req, res) {
    res.json({
        say : 'nicetomeetyou'
    })
})
