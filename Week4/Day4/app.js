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