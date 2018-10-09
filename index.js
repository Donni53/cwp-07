const http = require('http');
const fs = require('fs');

const publichandlers = require('./PublicHandler');
const articleshandlers = require('./handlers/ArticlesHandler');
const commentshandlers = require('./handlers/CommentsHandler');

const hostname = '127.0.0.1';
const port = 3000;

const handlers = {
    '/': publichandlers.indexHtml,
    '/index.html': publichandlers.indexHtml,
    '/form.html': publichandlers.formHtml,
    '/app.js': publichandlers.appJs,
    '/form.js': publichandlers.formJs,
    '/site.css': publichandlers.site,
    '/api/articles/readall': articleshandlers.readall,
    '/api/articles/read': articleshandlers.read,
    '/api/articles/update': articleshandlers.update,
    '/api/articles/create': articleshandlers.createArticle,
    '/api/articles/delete': articleshandlers.deleteArticle,
    '/api/comments/create': commentshandlers.createComment,
    '/api/comments/delete': commentshandlers.deleteComment,
};


const server = http.createServer((req, res) => {
    parseBodyJson(req, (err, payload) => {
        const handler = getHandler(req.url);
        handler(req, res, payload, (err, result, typecontent) => {
            if (err) {
                res.statusCode = err.code;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(err));
                return;
            }
            res.statusCode = 200;
            res.setHeader('Access-Control-Allow-Origin', '*');
            if (typecontent == undefined)
            {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(result));
            }
            else {
                res.setHeader('Content-Type', typecontent);
                res.end(result);

            }

        });
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

function getHandler(url) {
    return handlers[url] || notFound;
}



function notFound(req, res, payload, cb) {
    cb({code: 404, message: 'Not found'});
}

function parseBodyJson(req, cb) {
    let body = [];

    req.on('data', function (chunk) {
        body.push(chunk);
    }).on('end', function () {
        body = Buffer.concat(body).toString();
        let params;
        try {
            params = JSON.parse(body);
        }
        catch(err) {
            params = {};
        }
        cb(null, params);
    });
}