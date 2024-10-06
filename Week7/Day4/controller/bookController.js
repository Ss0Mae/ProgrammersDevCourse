const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');
const dotenv = require('dotenv');

dotenv.config();

const allBooks = (req, res) => {
    res.json('전체 도서 조회 ');
};

const bookDetail = (req, res) => {
    res.json('개별 도서 조회');
};

const booksByCategory = (req, res) => {
    res.json('카테고리별 도서 목록 조회');
}; 

module.exports = {
    allBooks,
    bookDetail,
    booksByCategory
};