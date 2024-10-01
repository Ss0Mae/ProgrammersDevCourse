const express = require('express');
const router = express.Router();

router.use(express.json());

// 좋아요 추가
router.post('/books', (req, res) => {
    res.json('전체 도서 조회 ');
});

// 좋아요 삭제
router.post('/books/:id',(req, res) => {
    res.json('개별 도서 조회');
});




module.exports = router;