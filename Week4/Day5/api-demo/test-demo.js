const express = require('express')
const app = express()

app.listen(1234)
// 서버 셋팅: 포트 넘버 1234로 셋팅


//GET 메소드로, /url 주소가 날라오면
// 매개변수로 전달받은 콜백 함수를 호출하겠어 => 서버에 셋팅
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
