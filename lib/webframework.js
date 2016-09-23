var http = require('http');
var host = require('./host');

var routes_get = {};
var routes_post = [];
var routes_put = [];
var routes_del = [];

module.exports = {
    get: function (route, cb) {
        routes_get[route] = cb;
    },
    post: function (route, cb) {

    },
    put: function (route, cb) {

    },
    del: function (route, cb) {

    },
    start: function (port) {
        http.createServer(function (request, response) {
            console.log(request);
            var headers = request.headers;
            var userAgent = headers['user-agent'];
            var referer = headers['referer'];
            var acceptLanguage = headers['accept-language'];
            var url = request.url;
            var method = request.method;
            // 发送 HTTP 头部 
            // HTTP 状态值: 200 : OK
            // 内容类型: text/plain
            response.writeHead(200, { 'Content-Type': 'text/plain' });

            // 发送响应数据 "Hello World"
            /** #141422
             * LatoWeb,Lato,'Helvetica Neue',Helvetica,Arial,sans-serif
            */
            var route = url.split('?')[0];

            var query = {};
            
            if (url.includes('?')) {
                var query_arr = url.split('?')[1].split('&');
                query_arr.map(function (query) {

                });
            }
            



            var out = JSON.stringify({
                ua: userAgent,
                method: method,
                lang: acceptLanguage,
                url: url,
                route: route,
                query: query,
                html: routes_get
            }, null, 4);

            if (routes_get.length === 0) {
                //response.end('hello (*^__^*)');
            }

            if (method === 'GET') {
                if (routes_get.hasOwnProperty(route)) {
                    routes_get['/about'](request, response);
                } else {
                    response.end('404');
                }

            }




        }).listen(port);
        // 终端打印如下信息
        console.log('Server running at http://' + host()[0] + ':' + port);
    }
}