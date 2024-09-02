const { application } = require('express')
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

    let number = parseInt(req.params.n);
    if (req.params.n - 10> 5) {
        console.log("URL로 전달받은 숫자가 10보다 큽니다.");
    }
    res.json({
        num: req.params.n
    })
})

//채널 주소 https://www.youtube.com/@15ya.fullmoon
//채널 주소 https://www.youtube.com/@ChimChakMan_Official
app.get('/:nickname', function (req, res) {

    const param = req.params;
    res.json({
        channel: param.nickname
    })
})