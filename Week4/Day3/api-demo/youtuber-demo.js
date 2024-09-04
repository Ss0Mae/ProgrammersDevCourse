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
db.set(1, youtuber1);
db.set(2, youtuber2);
db.set(3, youtuber3);

app.get('/youtuber/:id', function (req, res) {
    let { id } = req.params;
    id = parseInt(id);
    //console.log(id);
    if (db.get(id) === undefined) {
        res.json({
            message: "Wrong Access"
        })
    } else {
        res.json(db.get(id));
    }
})
