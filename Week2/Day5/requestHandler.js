const fs = require('fs');
const main_view = fs.readFileSync('./main.html', 'utf-8');
const orderlist_view = fs.readFileSync('./orderlist.html');
const mariadb = require('./database/connect/mariadb');

function main(response) {
    console.log('main');

    mariadb.query("SELECT * FROM product", function (err, rows) {
        console.log(rows);
    });
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(main_view);
    response.end();
}

function redRacket(response) {
    fs.readFile('./img/redRacket.png', function (err, data) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data);
        response.end(); 
    });
}

function blueRacket(response) {
    fs.readFile('./img/blueRacket.png', function (err, data) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data);
        response.end(); 
    });
}

function blackRacket(response) {
    fs.readFile('./img/blackRacket.png', function (err, data) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data);
        response.end(); 
    });
}

function order(response, productId) {
    response.writeHead(200, { 'Content-Type': 'text/html' });

    mariadb.query("INSERT INTO orderlist VALUES (" + productId+ ", '" + new Date().toLocaleDateString()+"');", function (err, rows) {
        console.log(rows);
    });
    response.write('order page');
    response.end(); 
}

let handle = {};
handle['/'] = main;
handle['/order'] = order;

/* Image Directory */
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

exports.handle = handle;