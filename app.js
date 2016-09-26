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

app.get('/foo/:bar/:name', function (req, res) {
    var bar = req.params.bar;
    var name = req.params.name;
    res.write('foo')
    res.write('<hr />');
    res.write(req.query.id);

    res.write('<hr />');
    res.write(bar);

    res.write('<hr />');
    res.write(name);

    res.end('');
});

app.on404(function (req, res) {
    fs.readFile('./html/404.html', function (err, data) {
        if (err) throw err;
        res.end(data);
    });
});

app.debug(true);//开启debug

app.start(3000);