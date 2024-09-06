const express = require('express')
const app = express()

// 서버 셋팅: 포트 넘버 1234로 셋팅
app.listen(1234)

const fruits = [
    { id: 1, name: "apple" },
    { id: 2, name: "banana" },
    { id: 3, name: "strawberry" },
    { id: 4, name: "blueberrry" }
    
];

// 과일 전체 조회
app.get('/fruits', function (req, res) {
    res.json(fruits);
})

// 과일 개별 조회
app.get('/fruits/:id', function (req, res) {
    let id = parseInt(req.params.id);
   //let fruit = fruits[id];

    let findFruit =
        fruits.find(f => (f.id === id));
    // fruits 배열 안에 있는 객체중, id 값이 params.id랑 같은 객체

    if (findFruit) {
      res.json(findFruit);   
    } else {
        res.status(404).send(
            "전달주신 id가 없습니다."
        )
    }
})