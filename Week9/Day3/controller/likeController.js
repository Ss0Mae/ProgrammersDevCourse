const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

const addLike = (req, res) => {
    const { id } = req.params;
   
    let receivedJwt = req.headers["authorization"];
    console.log("received jwt : ",receivedJwt);

    let decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);
    console.log(decodedJwt);

    let sql = `INSERT INTO likes (user_id, liked_book_id) VALUES (?,?)`;
    let values = [decodedJwt.id, id];

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

const removeLike = (req, res) => {
    const { id } = req.params;
    const { user_id } = req.body;

    let sql = `DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?`;
    let values = [user_id, id];

    conn.query(sql, values,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            return res.status(StatusCodes.OK).json(results);
        }
    )
}
module.exports = {
    addLike,
    removeLike
};