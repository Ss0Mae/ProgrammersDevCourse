const express = require('express');
const router = express.Router();
router.use(express.json());

let db = new Map();
let id = 1;

router
    .route('/channels')
    .get((req, res) => {
        if (db.size) {
            let channels = [];
            db.forEach(function (value, key) {
                channels.push(value);
            })
            res.status(200).json(channels);
        } else {
            res.status(404).json({
                message:'조회할 채널이 없습니다'
            })
        }
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

router
    .route('/channels/:id')
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
            res.status(404).json({
                message : '채널 정보를 찾을 수 없습니다'
            })
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
            res.status(404).json({
                message : '채널 정보를 찾을 수 없습니다'
            })
        }
    }) //채널 개별 삭제

    .get((req, res) => {
        let { id } = req.params;
        id = parseInt(id);
        const channelInfo = db.get(id);
        if (channelInfo) {
            res.status(200).json(channelInfo);
        } else {
            res.status(404).json({
                message : '채널 정보를 찾을 수 없습니다'
            })
        }
    }) //채널 개별 조회

module.exports = router;