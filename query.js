﻿(function (window) {

    //参数操作对象
    var query = (function () {
        var encodeURIComponent = window.encodeURIComponent,
            decodeURIComponent = window.decodeURIComponent,
            search = location.search.slice(1);

        //将对象转为参数字符函数
        function stringify(obj, isNotnull) {
            if (typeof obj !== 'object') return;

            var array = [];
            for (var p in obj) {
                var val = obj[p],
                    kvStr = p + '=' + encodeURIComponent(val);

                //是否只拼接非空
                isNotnull ? val && array.push(kvStr) : array.push(kvStr);
            }
            return array.join('&');
        }

        //将参数字符转为对象函数
        function parse(qstr) {
            if (typeof qstr !== 'string' || qstr.length === 0) return;

            var obj = {},
                kvs = qstr.split('&');
            for (var i = 0, len = kvs.length; i < len; i++) {
                var kv = kvs[i].split('=');
                obj[kv[0]] = decodeURIComponent(kv[1]);
            }
            return obj;
        }

        //获取参数函数
        function getItem(key, queryStr) {
            var obj = parse(queryStr || search);
            return obj && obj[key];
        }

        return {
            stringify: stringify,
            parse: parse,
            getItem: getItem
        };
    })();


    //CommonJS
    if (typeof exports === 'object') {
        return module.exports = query;
    }

    //添加到全局
    window.query = query;

})(window);