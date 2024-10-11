const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');

//주문 하기
const order = (req, res) => {
    res.json('주문하기');
};

// 주문 목록 조회
const getOrders = (req, res) => {
    res.json('주문 목록 조회');
};

// 주문 상세 조회
const getOrderDetail = (req, res) => {
    res.json('주문 상세 상품 조회');
};

module.exports = {
    order,
    getOrders,
    getOrderDetail
};