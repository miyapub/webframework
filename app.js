var app = require('./lib/webframework');
var fs = require('fs');

app.get('/', function (req, res) {
    fs.readFile('./html/index.html', function (err, data) {
        if (err) throw err;
        res.end(data);
    });
});

app.get('/about', function (req, res) {
    res.end('about ' + req.query.name);
});

app.get('/foo/:bar', function (req, res) {
    var value = req.params.bar;
    res.end(value);
});

app.on404(function (req, res) {
    fs.readFile('./html/404.html', function (err, data) {
        if (err) throw err;
        res.end(data);
    });
});

app.debug(true);//开启debug

app.start(3000);