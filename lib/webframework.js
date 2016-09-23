var http = require('http');
var host = require('./host');

var routes_get = {};
var routes_post = [];
var routes_put = [];
var routes_del = [];

module.exports = {
    get: function (route, cb) {
        if (route.includes('/')) {

        } else {
            //
            route = '/' + route;
            //加上根节点
        }


        if (route.includes('/')) {
            //存在 层级 路由
            //url.split('/').length
        }
        if (route.includes(':')) {
            //有 params 参数
            //route = route.split('/:')[0];

        }

        if (route.includes('&')) {
            //有 query 参数
        }
        routes_get[route] = {
            cb: cb
        };
    },
    post: function (route, cb) {

    },
    put: function (route, cb) {

    },
    del: function (route, cb) {

    },
    start: function (port) {
        http.createServer(function (request, response) {

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
            var route = url;// 默认就是输入的路由

            if (url.includes('/')) {
                //存在 层级 路由
                //url.split('/').length
            }
            if (route.includes('&')) {
                //有 query 参数
            }
            console.log('routes_get', routes_get);
            console.log('route', route);
            console.log('   ')
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

            //console.log(out);

            if (routes_get.length === 0) {
                //response.end('hello (*^__^*)');
            }



            var params = {};
            request.params = params;

            if (method === 'GET') {
                if (routes_get.hasOwnProperty(route)) {
                    routes_get[route].cb(request, response);
                } else {
                    response.end('404');
                }

            }




        }).listen(port);
        // 终端打印如下信息
        console.log('Server running at http://' + host()[0] + ':' + port);
    }
}