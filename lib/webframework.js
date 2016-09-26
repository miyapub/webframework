var http = require('http');
var host = require('./host');

var routes_get = {};
var routes_post = [];
var routes_put = [];
var routes_del = [];

function _on404(request, response) {
    response.end('404');
}
_debug = true;//默认开启
module.exports = {
    get: function (route, cb) {
        var params = [];
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

            var arr = route.split('/:');
            for (i = 1; i < arr.length; i++) {
                params.push(arr[i]);
            }
            route = arr[0];//路由名称
        }

        if (route.includes('&')) {
            //有 query 参数
        }
        routes_get[route] = {
            cb: cb,
            params: params
        };
    },
    post: function (route, cb) {

    },
    put: function (route, cb) {

    },
    del: function (route, cb) {

    },
    on404: function (cb) {
        _on404 = cb;
    },
    debug: function (bool) {
        _debug = bool;
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
            //response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.writeHead(200, { 'Content-Type': 'text/html' });
            // 发送响应数据 "Hello World"
            /** 
             * 
            */
            var route = url;// 默认就是输入的路由
            var query = {};
            var params = {};
            if (route.includes('?')) {
                //有 query 参数
                console.log('有 query 参数')
                var route = url.split('?')[0];//
                var query_string = url.replace(route + '?', '');
                var query_arr = query_string.split('&');

                query_arr.map(function (query_obj) {
                    var a_b = query_obj.split('=');
                    var key = a_b[0];
                    var value = a_b[1];
                    query[key] = value;
                });
            }
            if (route.includes('/')) {
                //存在 层级 路由
                var route_arr = route.split('/');
                var r='';
                route_arr.map(function (obj,index) {
                    r='/'+obj;
                    if (routes_get.hasOwnProperty(r)) {
                        route=r;//得到 路由 后面的 就是适配参数了
                        var params_arr=routes_get[r].params;
                        params_arr.map(function(p_k,i){
                            params[p_k]=route_arr[index+i+1];
                        });
                    }
                });

            }


            console.log('routes_get', JSON.stringify(routes_get, null, 4));
            console.log('route', JSON.stringify(route, null, 4));
            console.log('   ')
            var debugHTML = JSON.stringify({
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

            request.params = params;
            request.query = query;

            if (_debug) {
                response.write('<hr />');
                response.write(debugHTML);
                response.write('<hr />');
            }
            if (method === 'GET') {
                if (routes_get.hasOwnProperty(route)) {
                    routes_get[route].cb(request, response);
                } else {
                    //404
                    _on404(request, response);
                }
            }
        }).listen(port);
        // 终端打印如下信息
        console.log('Server running at http://' + host()[0] + ':' + port);
    }
}