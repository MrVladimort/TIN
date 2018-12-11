const http = require('http');
const url = require('url');

const HOST = 'localhost';
const PORT = 8080;

http.createServer(function (req, res) {
    try {
        res.writeHead(200, {'Content-Type': 'text/html'});
        const requestUrl = url.parse(`http://${HOST}:${PORT}${req.url}`, true);
        const {query, pathname} = requestUrl;

        const queryKeys = Object.keys(query);
        const firstKey = queryKeys[0], secondKey = queryKeys[1];

        if (!firstKey) throw new Error("Need to provide first argument");
        if (!secondKey) throw new Error("Need to provide second argument");

        if (query[firstKey] === '' || query[secondKey] === '' || isNaN(query[firstKey]) || isNaN(query[secondKey]))
            throw new Error("One of arguments is not a number");

        const first = Number(query[firstKey]), second = Number(query[secondKey]);
        let result = 0;
        switch (pathname) {
            case "/add":
                result = first + second;
                break;
            case "/sub":
                result = first - second;
                break;
            case "/mul":
                result = first * second;
                break;
            case "/div":
                result = first / second;
                break;
            default:
                throw new Error("Unresolvable operation");
        }

        res.write(`<h1>Your result is ${result}</h1>`)
    } catch (e) {
        console.error(e);
        res.write(`Error: ${e.message}`);
    } finally {
        res.end();
    }
}).listen(8080);