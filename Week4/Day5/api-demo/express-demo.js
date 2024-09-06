const express = require('express')
const app = express()

// 서버 셋팅: 포트 넘버 1234로 셋팅
app.listen(1234)


//GET 메소드로, /url 주소가 날라오면
// 매개변수로 전달받은 콜백 함수를 호출하겠어 => 서버에 셋팅

app.get('/product/1', function (req, res) {
    res.json({
        num : 1,
        
    });
})

app.get('/product/2', function (req, res) {
    res.json({
        num : 2,
        
    });
})

app.get('/product/3', function (req, res) {
    res.json({
        num : 3,
        
    });
})
