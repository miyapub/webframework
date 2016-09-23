var app = require('./lib/webframework');

app.get('/',function(){
    
    return 'index';
});

app.get('/about',function(req,res){
    console.log('query',req.query);
    res.end('about'+req.query);
});

app.get('/foo/:bar',function(req,res){
    var value=req.params.bar;
    res.end(value);
});

app.start(3000);