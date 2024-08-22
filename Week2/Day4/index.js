let server = require('./server');
let router = require('./router');
let requestHandler = require('./requestHandler');

server.start(router.route, requestHandler.handle);