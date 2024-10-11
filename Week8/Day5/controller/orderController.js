const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');

//주문 하기
const order = (req, res) => {
    const { items, delivery, totalQuantity, totalPrice,userId, firstBookTitle } = req.body;

    let sql = `INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?);`;
    let delivery_id = 3;
    let order_id;
    let values = [delivery.address, delivery.receiver, delivery.contact];
    // conn.query(sql, values,
    //     (err, results) => {
    //         if (err) {
    //             console.log(err);
    //             return res.status(StatusCodes.BAD_REQUEST).end();
    //         }
    //         delivery_id = results.insertId;
    //         return res.status(StatusCodes.OK).json(results);
    //     }
    // )
    sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) 
            VALUES (?, ?, ?, ?, ?);`;
    values = [firstBookTitle, totalQuantity, totalPrice, userId, delivery_id];
    conn.query(sql, values,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            order_id = results.insertId;
            console.log(order_id);
            return res.status(StatusCodes.OK).json(results);
        }
    )
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