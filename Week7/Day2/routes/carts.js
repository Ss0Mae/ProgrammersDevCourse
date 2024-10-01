const express = require('express');
const router = express.Router();

router.use(express.json());

// 장바구니 담기 
router.post('/carts', (req, res) => {
    res.json('장바구니 담기');
});

// 장바구니 조회
router.get('/carts',(req, res) => {
    res.json('장바구니 조회');
});

// 장바구니 도서 삭제
router.get('/carts/:id',(req, res) => {
    res.json('장바구니 도서 삭제');
});



module.exports = router;