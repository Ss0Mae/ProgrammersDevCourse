const express = require('express');
const router = express.Router();
const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');
const join = require('../controller/userController');

router.use(express.json());

//회원가입
router.post('/join',join );

//로그인
router.post('/login',(req, res) => {
    res.json('로그인');
});

//비밀번호 초기화 요청
router.post('/reset',(req, res) => {
    res.json('비밀번호 초기화 요청');
});

//비밀번호 초기화
router.put('/reset', (req, res) => {
    res.json('비밀번호 초기화');
});

module.exports = router;