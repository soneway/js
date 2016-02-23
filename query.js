﻿(function (window) {

    //参数操作对象
    var query = (function () {

        //将对象转为参数字符函数
        function stringify(obj) {
            if (typeof obj !== 'object') return;

            var array = [];
            for (var p in obj) {
                array.push(p + '=' + encodeURIComponent(obj[p]));
            }
            return array.join('&');
        }

        //将参数字符转为对象函数
        function parse(qstr) {
            if (typeof qstr !== 'string') return;

            var obj = {},
                kvs = qstr.split('&');
            for (var i = 0, len = kvs.length; i < len; i++) {
                var kv = kvs[i].split('=');
                obj[kv[0]] = decodeURIComponent(kv[1]);
            }
            return obj;
        }

        //获取参数函数
        var getItem = (function () {
            var search = location.search.slice(1);
            return function (key) {
                return parse(search)[key];
            }
        })();

        return {
            stringify: stringify,
            parse    : parse,
            getItem  : getItem
        };
    })();


    //CommonJS
    if (typeof exports === 'object') {
        return module.exports = query;
    }

    //添加到全局
    window.query = query;

})(window);