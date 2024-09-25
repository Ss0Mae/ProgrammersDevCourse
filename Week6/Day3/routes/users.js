const express = require('express');
const router = express.Router();
const conn = require('../mariadb')
const { body,param, validationResult } = require('express-validator')
router.use(express.json()) // http 외 모듈 'json' 사용

const validate = (req,res,next) => {
    const err = validationResult(req);
    if (err.isEmpty()) {
        return next();
    } else {
          return res.status(400).json(err.array())
    }
}

// 로그인
router.post(
    '/login',
    [
        body('email').notEmpty().isEmail().withMessage('올바른 이메일 형식을 입력해주세요'),
        body('password').notEmpty().isString.withMessage('비밀번호 확인 필요'),
        validate
    ],
    function (req, res) {
        const { email, password } = req.body;
        let loginUser = {};
        let sql = `SELECT * FROM users WHERE email = ?`
        conn.query(sql,email,
            function (err, results) { 
                if (err) {
                        console.log(err);
                        return res.status(400).end();
                    }
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
router.post(
    '/join',
    [
        body('email').notEmpty().isEmail().withMessage('올바른 이메일 형식을 입력해주세요'),
        body('name').notEmpty().isString.withMessage('이름 확인 필요'),
        body('password').notEmpty().isString.withMessage('비밀번호 확인 필요'),
        body('contact').notEmpty().isString.withMessage('연락처 확인 필요'),
        validate
    ],
    function (req, res) {
      
    const { email, name, password, contact } = req.body;
    let sql = `INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)`;
    let values = [email, name, password, contact]; 

    conn.query(sql,values,
        function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(400).end();
            }
            res.status(201).json(results);
        }
    )
        
});

router
    .route('/users') 
    .get(//회원 개별 조회
        [
            body('email').notEmpty().isEmail().withMessage('올바른 이메일 형식을 입력해주세요'),
            validate
        ],
        function (req, res) {
            let { email } = req.body;
            let sql = `SELECT * FROM users WHERE email = ?`
            conn.query(sql,email,
                function (err, results, fields) {
                    if (err) {
                        console.log(err);
                        return res.status(400).end();
                    }
                    res.status(200).json(results)          
                }
            );   
            
    })
    .delete( //회원 탈퇴
        [
            body('email').notEmpty().isEmail().withMessage('올바른 이메일 형식을 입력해주세요'),
            validate
        ],
        function (req, res) {
            let { email } = req.body;
            let sql = `DELETE FROM users WHERE email = ?`
            conn.query(sql, email,
                function (err, results, fields) {
                   if (err) {
                        console.log(err);
                        return res.status(400).end();
                    }

                    if (results.affectedRows === 0) {
                        return res.status(400).end();
                    } else {
                        res.status(200).json(results)   
                    }
                }
            ); 
    })

module.exports = router // 모듈화 진행