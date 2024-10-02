const express = require('express');
const router = express.Router();
const conn = require('../mariadb');

router.use(express.json());

//회원가입
router.post('/join', (req, res) => {
    const { email, password } = req.body;
    
    let sql = 'INSERT INTO users (email, password) VALUES(?, ?)';
    let values = [email, password];

    conn.query(sql, values,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(400).end();
            }
            res.status(201).json(results);
        }
    )
    res.json('회원가입');
});

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