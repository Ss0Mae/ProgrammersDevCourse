const express = require('express');
const app = express()
app.listen(7777);

// 로그인
app.post('/login', function (req, res) {
    
})
// 회원 가입
app.post('/join', function (req, res) {
    
})
// 회원 개별 조회
app.get('/users/:id', function (req, res) {
    
})
// 회원 개별 탈퇴
app.delete('/users/:id', function (req, res) {
    
})