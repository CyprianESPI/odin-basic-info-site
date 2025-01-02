const { createServer } = require('node:http');
const fs = require('node:fs');

const hostname = '127.0.0.1';
const port = 8000;

fs.readFile('./pages/index.html', (err, data) => {
    if (err) {
        console.error(err)
        return;
    }
    console.log(data);
    
    const server = createServer((req, res) => {
        res.statusCode = 200;
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
    server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    });
});