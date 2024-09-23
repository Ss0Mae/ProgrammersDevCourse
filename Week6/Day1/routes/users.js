const express = require('express');
const router = express.Router();
const conn = require('../mariadb')

// A simple SELECT query
conn.query(
  'SELECT * FROM `users`',
  function (err, results, fields) {
    
  }
);

router.use(express.json()) // http 외 모듈 'json' 사용

let db = new Map();
let id = 1; //객체 식별 아이디

function isExist(obj) {
    if (Object.keys(obj).length) return true;
    else return false;
}
// 로그인
router.post('/login', function (req, res) {
    console.log(req.body); //id, pwd

    //id가 db에 저장된 회원인지 확인
    const { userId, password } = req.body;
    //let hasUserId = false;
    let loginUser = {};
    db.forEach(function (user, id) {
        //console.log(user.userId);
        if (user.userId === userId) {
            loginUser = user;
        } 
    })
    
    if (isExist(loginUser)) {
        
        //넘어온 pwd가 id에 맞는 비밀번호인지
        if (loginUser.password === password) {
            res.status(200).json({
                message: `${loginUser.name}님 로그인 되었습니다`
            })
        } else {
            res.status(400).json({
                message: `비밀번호가 틀렸습니다`
            })
        }
    } else {
        res.status(404).json({
            message: '입력하신 아이디는 없는 아이디 입니다.'
        })
    }
})

// 회원 가입
router.post('/join', function (req, res) {
    console.log(req.body);
    // 입력된 body 객체가 비어 있지 않은지 확인
    if (Object.keys(req.body).length !== 0) {
        // 예시로 ID를 부여하는 방식을 간단히 시뮬레이션
        const {userId} = req.body
        db.set(userId, req.body);

        res.status(201).json({
            message: `${db.get(userId).name}님 환영합니다.`
        });
    } else {
        res.status(400).json({
            message: `입력값을 다시 확인해주세요.`
        });
    }
});

router
    .route('/users')
    .get(function (req, res) {
        let { userId } = req.body;
    
        const user = db.get(userId);
        if (user) {
            res.status(200).json({
                userId: user.userId,
                name : user.name
            })
        } else {
            res.status(404).json({
                message : '잘못된 아이디 번호입니다'
            })
        }
    })
    .delete(function (req, res) {
        let { userId } = req.body;
    
        const user = db.get(userId);
        if (user) {
            db.delete(id);
            res.status(200).json({
            message: `${user.name}님 다음에 또 뵙겠습니다`
            })
        } else {
            res.status(404).json({
                message : '잘못된 아이디 번호입니다'
            })
        }
    })

module.exports = router // 모듈화 진행