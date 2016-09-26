# webframework
webframework

install:

``
npm install webframework
``


eg:

app.js

```
var app = require('webframework');
app.get('/', function (req, res) {
    res.end('index');
});
app.on404(function (req, res) {
    res.end('404');
});
app.debug(true);//show debug info
app.start(5000);
``` 

```
http://localhost:5000
```