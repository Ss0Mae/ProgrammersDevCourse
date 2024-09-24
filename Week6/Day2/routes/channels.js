const express = require('express');
const router = express.Router();
const conn = require('../mariadb')
router.use(express.json());

let db = new Map();
let id = 1;

function notFoundChannel(res) {
    res.status(404).json({
        message:'채널 정보를 찾을수 없습니다'
    })
}

router
    .route('/')
    .get((req, res) => {//채널 전체 조회
        const { userId } = req.body;

        let sql = `SELECT * FROM channels WHERE user_id = ?`
        let channels = []
        if (user_id) {
            conn.query(sql, userId,
                function (err, results) {
                    if (results.length)
                        channels = results;
                    else
                        notFoundChannel(res);
                }
            )
        }
        else
            res.status(400).end();
    }) 

    .post((req, res) => {
        const { name, userId } = req.body;
        if (name && userId) {
            let sql = `INSERT INTO channels (name, user_id) VALUES (?, ?)`;
            let values = [name, userId];
            conn.query(sql, values,
                function (err, results) {
                    res.status(201).json(results);
                }
            )
        } else {
            res.status(400).json({
                message : '요청값을 제대로 보내주세요'
            })
        }
    }) //채널 개별 생성

router
    .route('/:id')
    .put((req, res) => {
        let { id } = req.params;
        id = parseInt(id);

        let channelInfo = db.get(id);
        let prevChannelTitle = channelInfo.channelTitle;
        if (channelInfo) {
            let newTitle = req.body.channelTitle;
            channelInfo.channelTitle = newTitle;
            db.set(id, channelInfo);

            res.json({
                message : `채널명이 정상적으로 수정되었습니다. 기존 ${prevChannelTitle} -> 수정 ${newTitle}`
            })
        } else {
            notFoundChannel();
        }
    }) //채널 개별 수정

    .delete((req, res) => {
        let { id } = req.params;
        id = parseInt(id);
        const channelInfo = db.get(id);
        if (channelInfo) {
            db.delete(id);
            res.status(200).json({
                message:`${channelInfo.channelTitle}님 채널이 정상적으로 삭제되었습니다`
            })
        } else {
           notFoundChannel();
        }
    }) //채널 개별 삭제

    .get((req, res) => {
        let { id } = req.params;
        id = parseInt(id);
        let sql = `SELECT * FROM channels WHERE id = ?`
        conn.query(sql, id,
            function (err, results) {
                if (results.length)
                    res.status(200).json(results)
                else
                    notFoundChannel(res);
            }
        )
    }) //채널 개별 조회

module.exports = router;