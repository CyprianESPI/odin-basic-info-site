const { createServer } = require('node:http');
const fs = require('node:fs');

const hostname = 'localhost';
const port = 8080;
const ROUTES = [
    { urlPath: '/', filePath: './pages/index.html'},
    { urlPath: '/about', filePath: './pages/about.html'},
    { urlPath: '/contact-me', filePath: './pages/contact-me.html'},
]

function updateResponseContent(resp, filePath) {
    console.log(`Reading content from ${filePath}`);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        resp.write(data);
        console.log(`Sending response`);
        resp.end();
    });
}

const server = createServer((req, res) => {
    console.log(`From ${req.url}`);
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