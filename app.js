var app = require('./lib/webframework');
var fs = require('fs');

app.get('/', function () {

    return 'index';
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

app.start(3000);