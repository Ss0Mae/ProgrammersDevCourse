const express = require('express');
const router = express.Router();
const conn = require('../mariadb')

router.use(express.json()) // http 외 모듈 'json' 사용

// 로그인
router.post('/login', function (req, res) {
    const { email, password } = req.body;
    let loginUser = {};
    let sql = `SELECT * FROM users WHERE email = ?`
    conn.query(sql,email,
        function (err, results) { 
            loginUser = results[0];

            if (loginUser && loginUser.password === password) { //email이 db에 저장된 회원인지 확인
                res.status(200).json({
                    message: `${loginUser.name}님 로그인 되었습니다.`
                })
            }
            else {
                res.status(404).json({
                    message : "이메일 또는 비밀번호가 틀렸습니다"
                })
            }
        }
    );  
})

// 회원 가입
router.post('/join', function (req, res) {
    // 입력된 body 객체가 비어 있지 않은지 확인
    if (Object.keys(req.body).length !== 0) {
        const { email, name, password, contact } = req.body;
        let sql = `INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)`;
        let values = [email, name, password, contact]; 

        conn.query(sql,values,
            function (err, results, fields) {
                res.status(201).json(results);
            }
        )
    } else {
        res.status(400).json({
            message: `입력값을 다시 확인해주세요.`
        });
    }
});

router
    .route('/users')
    .get(function (req, res) {
        let { email } = req.body;
        let sql = `SELECT * FROM users WHERE email = ?`
        conn.query(sql,email,
            function (err, results, fields) {
                 res.status(200).json(results)          
            }
        );   
            
    })
    .delete(function (req, res) {
        let { email } = req.body;
        let sql = `DELETE FROM users WHERE email = ?`
        conn.query(sql, email,
            function (err, results, fields) {
                 res.status(200).json(results)
            }
        ); 
    })

module.exports = router // 모듈화 진행