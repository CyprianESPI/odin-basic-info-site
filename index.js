const { createServer } = require('node:http');
const fs = require('node:fs');

const hostname = '127.0.0.1';
const port = 8000;
const ROUTES = [
    { urlPath: '/', filePath: './pages/index.html'},
    { urlPath: '/about', filePath: './pages/about.html'},
    { urlPath: '/contact-me', filePath: './pages/contact-me.html'},
]

function updateResponseContent(resp, filePath) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        resp.write(data);
        resp.end();
    });
}

const server = createServer((req, res) => {
    const matchingRoute = ROUTES.find((route) => route.urlPath === req.url)
    // Check if a 404 should be sent back
    if (!matchingRoute) {
        res.statusCode = 404;
        res.writeHead(404, {'Content-Type': 'text/html'});
        updateResponseContent(res, './pages/404.html');
        return;
    }
    res.statusCode = 200;
    res.writeHead(200, {'Content-Type': 'text/html'});
    updateResponseContent(res, matchingRoute.filePath);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});