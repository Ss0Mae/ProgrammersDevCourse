const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const addToCart = (req, res) => {
    const { book_id, quantity} = req.body;
    let authorization = ensureAuthorization(req,res);

    let sql = `INSERT INTO cartitems (book_id, quantity, user_id) VALUES (?,?,?)`;
    let values = [book_id, quantity, authorization.id];
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
    const { selected } = req.body; //selected -> array 
    let authorization = ensureAuthorization(req, res);
    if (authorization instanceof jwt.TokenExpiredError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message": "로그인 세션이 만료되었습니다. 다시 로그인 하세요."
        });
    } else {
        let sql = `SELECT cartitems.id, book_id, title, summary, quantity, price 
                FROM cartitems LEFT JOIN books 
                ON cartitems.book_id = books.id
                WHERE user_id = ? AND cartitems.id IN (?)`;
        let values = [authorization.id, selected]
        conn.query(sql, values,
            (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }
                return res.status(StatusCodes.OK).json(results);
            })
    }
};

const removeCartItem = (req, res) => {
    const cartItemId = req.params.id;
    let sql = `DELETE FROM cartitems WHERE id = ?;`;

    conn.query(sql, cartItemId,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            return res.status(StatusCodes.OK).json(results);
        }
    )
};

function ensureAuthorization(req,res) {
    try {
        let receivedJwt = req.headers["authorization"];
        console.log("received jwt : ", receivedJwt);

        let decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);
        console.log(decodedJwt);
        return decodedJwt;
    } catch (err) {
        console.log(err.name);
        console.log(err.message);
        return err;
    }
};

module.exports = {
    addToCart,
    getCartItems,
    removeCartItem
};