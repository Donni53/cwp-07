const fs = require('fs');

function ReadAppJs(callback) {
    fs.readFile("./public/app.js", "utf8", function (err, data) {
        if (err) {
            console.log("ReadFile error");
        }
        else {
            callback(data);
        }
    });
}

function ReadFormJs(callback) {
    fs.readFile("./public/form.js", "utf8", function (err, data) {
        if (err) {
            console.log("ReadFile error");
        }
        else {
            callback(data);
        }
    });
}

function ReadSiteCss(callback) {
    fs.readFile("./public/site.css", "utf8", function (err, data) {
        if (err) {
            console.log("ReadFile error");
        }
        else {
            callback(data);
        }
    });
}

function ReadIndexHtml(callback) {
    fs.readFile("./public/index.html", "utf8", function (err, data) {
        if (err) {
            console.log("ReadFile error");
        }
        else {
            callback(data);
        }
    });
}

function ReadFormHtml(callback) {
    fs.readFile("./public/form.html", "utf8", function (err, data) {
        if (err) {
            console.log("ReadFile error");
        }
        else {
            callback(data);
        }
    });
}
module.exports = {
    indexHtml,
    formHtml,
    appJs,
    formJs,
    site
};

function indexHtml(req, res, payload, cb) {
    ReadIndexHtml(function(data) {
        cb(null, data, 'text/html');
    });
}

function formHtml(req, res, payload, cb) {
    ReadFormHtml(function(data) {
        cb(null, data, 'text/html');
    });
}

function appJs(req, res, payload, cb) {
    ReadAppJs(function(data) {
        cb(null, data, 'text/html');
    });
}

function formJs(req, res, payload, cb) {
    ReadFormJs(function(data) {
        cb(null, data, 'text/html');
    });
}

function site(req, res, payload, cb) {
    ReadSiteCss(function(data) {
        cb(null, data, 'text/html');
    });
}