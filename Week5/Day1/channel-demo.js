const e = require('express');
const express = require('express');
const app = express();
app.listen(7777);
app.use(express.json());

let db = new Map();
let id = 1;

app
    .route('/channels')
    .get((req, res) => {
        res.send("전체 조회")
    }) //채널 전체 조회
    .post((req, res) => {
        const { channelTitle } = req.body;
        if (channelTitle) {
            db.set(id++, req.body);
            res.status(201).json({
                message: `${channelTitle}채널을 응원합니다`
            });
        } else {
            res.status(400).json({
                message : "채널명이 없습니다"
            })
        }
    }) //채널 개별 생성

app
    .route('/channels/:id')
    .put((req, res) => {
        res.send("개별 수정")
    }) //채널 개별 수정

    .delete((req, res) => {
        res.send("개별 삭제")
    }) //채널 개별 삭제

    .get((req, res) => {
        let { id } = req.params;
        id = parseInt(id);
        channelInfo = db.get(id);
        if (channelInfo) {
            res.status(200).json(channelInfo);
        } else {
            res.status(404).json({
                message : '채널 정보를 찾을 수 없습니다'
            })
        }
    }) //채널 개별 조회
