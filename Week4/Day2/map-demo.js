const express = require('express')
const app = express()

// 서버 셋팅: 포트 넘버 1234로 셋팅
app.listen(1234)

app.get('/', function (req, res) {
    res.send("Hello World");
})

//localhost:1234/1 => Notebook
//localhost:1234/2 => Cup
//localhost:1234/3 => Chair

app.get('/:id', function (req, res) {
    const { id } = req.params
    
    if (db.get(id) === undefined) {
        console.log("undefined Test");
        res.json({
            message: "없는 상품입니다."
        })
    } else {
        res.json({
            id: id,
            productName: db.get(parseInt(id))
        })
    }
})

let db = new Map();
let notebook = {
    productName: "Notebook",
    pricel : 2000000
}

let cup = {
    productName: "Cup",
    pricel : 3000
}

let chair = {
    productName: "Chair",
    pricel : 100000
}

let poster = {
    productName: "Poster",
    pricel : 20000
}
db.set(1, notebook); // key- value
db.set(2, cup);
db.set(3, chair);
db.set(4, poster);

console.log(db);
console.log(db.get(1));
console.log(db.get(2));
console.log(db.get(3));
console.log(db.get(4));