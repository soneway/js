﻿(function () {

    // 查询字符操作对象
    var query = (function () {
        var Object = window.Object,
            decodeURIComponent = window.decodeURIComponent,
            encodeURIComponent = window.encodeURIComponent,
            query = {
                allData: parse(),
                getItem: getItem,
                parse: parse,
                stringify: stringify
            };

        // 获取项
        function getItem(key) {
            if (!key) {
                return;
            }
            return query.allData[key];
        }

        // 查询字符转为对象
        function parse(str) {
            str || (str = location.search.slice(1));

            // 字符
            if (typeof str === 'string' && str) {
                var rs = {};
                str.split('&').forEach(function (item) {
                    var kvs = item.split('=');
                    rs[kvs[0]] = decodeURIComponent(kvs[1]);
                });
                return rs;
            }
            return null;
        }

        // 对象转为查询字符
        function stringify(obj) {
            Object.keys(obj).map(function (key) {
                return key + '=' + encodeURIComponent(obj[key]);
            }).join('&');
        }

        return query;
    })();


    // CommonJS
    if (typeof exports === 'object') {
        return module.exports = query;
    }

    // 添加到全局
    window.query = query;

})();
