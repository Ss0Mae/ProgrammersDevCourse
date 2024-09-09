const express = require('express');
const app = express()
app.listen(7777);
app.use(express.json()) // http 외 모듈 'json' 사용

let db = new Map();
let id = 1; //객체 식별 아이디

function isExist(obj) {
    if (Object.keys(obj).length) return true;
    else return false;
}
// 로그인
app.post('/login', function (req, res) {
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
        console.log('ID 매칭 성공');
        //넘어온 pwd가 id에 맞는 비밀번호인지
        if (loginUser.password === password) {
            console.log("password 매칭성공");
        } else {
            console.log("password 매칭 실패");
        }
    } else {
       console.log('입력하신 아이디는 없는 아이디 입니다.');
    }
})

// 회원 가입
app.post('/join', function (req, res) {
    console.log(req.body);
    // 입력된 body 객체가 비어 있지 않은지 확인
    if (Object.keys(req.body).length !== 0) {
        // 예시로 ID를 부여하는 방식을 간단히 시뮬레이션
        db.set(id++, req.body);

        res.status(201).json({
            message: `${req.body.name}님 환영합니다.`
        });
    } else {
        res.status(400).json({
            message: `입력값을 다시 확인해주세요.`
        });
    }
});

app
    .route('/users/:id')
    .get(function (req, res) {
        let { id } = req.params;
        id = parseInt(id);

        const user = db.get(id);
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
        let { id } = req.params;
        id = parseInt(id);

        const user = db.get(id);
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
