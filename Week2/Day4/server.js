let http = require('http'); // 사용할 프로토콜 설정
function start() {

    function onRequest(request, response) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write('Hello Node.js');
        response.end();
    }
    http.createServer(onRequest).listen(8888);
}

exports.start = start // 밖에서도 사용가능하게 해준다