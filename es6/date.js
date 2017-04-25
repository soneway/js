// 获取date字符函数
function getDateStr(date) {
  if (!date instanceof Date) {
    throw '必须为Date';
  }

  const isoStr = date.toISOString();
  return isoStr.slice(0, 10);
}

// 获取倒计时函数
function getTimespan(ts) {
  const now = new Date();
  const today = new Date(getDateStr(now));
  const tmpDate = new Date(+today + ts);
  return tmpDate.toISOString().slice(11, 19);
}

// 获取多久以前函数
function getBeforeTime(opts = {}) {
  // 配置项
  opts = Object.assign({}, getBeforeTime.defaults, opts);
  const {date, splitReg, units, type, rightNow} = opts;

  // 目标时间
  if (!date instanceof Date) {
    throw '必须为Date';
  }

  // 时间间隔
  const timeSpan = Date.now() - date;
  // 时间间隔提取出的年月日等数字信息
  const spanNums = new Date(timeSpan).toISOString().split(splitReg);
  // 时间原点提取提取出的年月日等数字信息
  const originNums = new Date(0).toISOString().split(splitReg);

  // 获取的多少年月日前信息数组
  const rsArray = units.map((item, index) => {
    let num = spanNums[index];
    num -= originNums[index];
    return +num + item;
  });

  switch (type) {
    case 1: {
      return rsArray.join('');
    }
    case 2: {
      return rsArray;
    }
    case 3: {
      let rsStr = rightNow;
      for (let i = 0, len = rsArray.length; i < len; i++) {
        const item = rsArray[i];
        if (item) {
          rsStr = item + units[i];
          break;
        }
      }
      return rsStr;
    }
  }
}
getBeforeTime.defaults = {
  splitReg: /[^\d]/,
  // 年月日等单位信息
  units: ['年', '月', '天', '小时', '分', '秒'],
  // 返回数据类型(1: x年x月x天前, 2: [年, 月, 日], 3: x年前或者x月前)
  type: 1,
  // 刚刚信息
  rightNow: '刚刚'
};


// 日期相关处理对象
export default {
  // 获取date字符函数
  getDateStr,
  // 获取倒计时函数
  getTimespan,
  // 获取多久以前函数
  getBeforeTime
};