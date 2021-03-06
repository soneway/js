﻿// 所有的查询字符对象
const queryData = parse();

// 获取项
function getItem(key) {
  if (!key) {
    return;
  }
  return parse()[key];
}

// 查询字符转为对象
function parse(str) {
  str || (str = location.search.slice(1));

  const rs = {};
  // 字符
  if (typeof str === 'string' && str) {
    str.split('&').forEach((item) => {
      const kv = item.split('=');
      const key = kv[0];
      const val = kv[1];
      val !== undefined && (rs[key] = decodeURIComponent(val));
    });
  }
  return rs;
}

// 对象转为查询字符
function stringify(obj) {
  return Object.keys(obj).map((key) => {
    return key + '=' + encodeURIComponent(obj[key]);
  }).join('&');
}


// 查询字符处理类
export default {
  getItem,
  parse,
  stringify
};

export { queryData };
