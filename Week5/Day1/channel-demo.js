const express = require('express');
const app = express();
app.listen(7777);
app.use(express.json());

let db = new Map();
let id = 1;

app
    .route('/channels')
    .get((req, res) => {
        res.send("개별 생성")
    }) //채널 개별 생성
    .post((req, res) => {
        res.send("전체 조회")
    }) //채널 전체 조회

app
    .route('/channels/:id')
    .put((req, res) => {
        res.send("개별 수정")
    }) //채널 개별 수정
    .delete((req, res) => {
        res.send("개별 삭제")
    }) //채널 개별 삭제
    .get((req, res) => {
        res.send("개별 조회")
    }) //채널 개별 조회
