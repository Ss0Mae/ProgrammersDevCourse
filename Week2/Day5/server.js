let http = require('http'); // 사용할 프로토콜 설정
let url = require('url');

function start(route, handle) {
    
    function onRequest(request, response) {
        let pathname = url.parse(request.url).pathname;
        let queryData = url.parse(request.url, true).query;
        route(pathname, handle,response, queryData.productId);
    }
    http.createServer(onRequest).listen(8080);
}

exports.start = start // 밖에서도 사용가능하게 해준다