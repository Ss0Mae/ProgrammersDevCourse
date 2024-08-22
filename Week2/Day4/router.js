function route(pathname, handle, response) {
    console.log('pathname: ' + pathname);

    if (typeof handle[pathname] == 'function') {
     handle[pathname](response);   
    }
    else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.write('Wrong Page Access');
        response.end();
    }
    
}

exports.route = route;