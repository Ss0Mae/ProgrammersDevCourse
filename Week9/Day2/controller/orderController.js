//const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');
const mariadb = require('mysql2/promise');
//주문 하기
const order = async (req, res) => {
    const conn = await mariadb.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '1234',
        database: 'Bookshop',
        dateStrings: true
    });
    const { items, delivery, totalQuantity, totalPrice,userId, firstBookTitle } = req.body;
    
    //delivery 테이블 삽입
    let sql = `INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?);`;
    let values = [delivery.address, delivery.receiver, delivery.contact];
    let [results] = await conn.execute(sql, values);
    let delivery_id = results.insertId;

    // orders 테이블 삽입
    sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) 
            VALUES (?, ?, ?, ?, ?);`;
    values = [firstBookTitle, totalQuantity, totalPrice, userId, delivery_id];
    [results] = await conn.execute(sql, values);
    let order_id = results.insertId;

    //orderedBook 테이블 삽입
    sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?;`;
    values = [];
    items.forEach((item) => {
        values.push([order_id, item.book_id, item.quantity]);
    })
    results = await conn.query(sql, [values]);
    
    let result = await deleteCartItems(conn);
    return res.status(StatusCodes.OK).json(result);
};

const deleteCartItems = async (conn) => {
    let sql = "DELETE FROM cartitems WHERE id IN (?)";
    let values = [1, 2, 3];
    
    let result = await conn.query(sql, [values]);
    return result;
}
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