var app = require('./lib/webframework');

app.get('/',function(){
    
    return 'index';
});

app.get('/about',function(req,res){
    res.end('about');
});

app.get('/too/:bar',function(req,res){
    var value=req.params.bar;
    res.end(value);
});

app.start(3000);