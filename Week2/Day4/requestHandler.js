function main(response) {
    console.log('main');
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write('Jo SeongMin');
    response.end();
}

function login(response) {
    console.log('login');
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write('login page');
    response.end();
}

let handle = {};
handle['/'] = main;
handle['/login'] = login;

exports.handle = handle;