var app = require('./lib/webframework');

app.get('/',function(){
    
    return 'index';
});

app.get('/about',function(req,res){
    res.end('about');
});

app.start(3000);