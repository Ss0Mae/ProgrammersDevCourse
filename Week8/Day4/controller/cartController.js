const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');
const dotenv = require('dotenv');

dotenv.config();

const addToCart = (req, res) => {
    const { book_id, quantity, user_id } = req.body;

    let sql = `INSERT INTO cartitems (book_id, quantity, user_id) VALUES (?,?,?)`;
    let values = [book_id, quantity, user_id];
    conn.query(sql, values,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            return res.status(StatusCodes.OK).json(results);
        }
    )
};

const getCartItems = (req, res) => {
    res.json('장바구니 조회');
};

const removeCartItem = (req, res) => {
    res.json('장바구니 도서 삭제');
};

module.exports = {
    addToCart,
    getCartItems,
    removeCartItem
};