let http = require('http'); // 사용할 프로토콜 설정
let url = require('url');

function start(route) {
    
    function onRequest(request, response) {
        let pathname = url.parse(request.url).pathname;
        route(pathname);

        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write('Hello Node.js');
        response.end();
    }
    http.createServer(onRequest).listen(8888);
}

exports.start = start // 밖에서도 사용가능하게 해준다