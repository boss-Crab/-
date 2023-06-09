const dayjs = require('dayjs');

module.exports = {
  base64Encode(str = '') {
    return new Buffer.from(str).toString('base64');
  },

  time() {
    return dayjs().format('YYYY-MM-DD HH:mm:ss');
  },

  timestamp(data) {
    return new Date(data).getTime();
  },

  // 从对象中排除不需显示的属性
  unPick(source, arr) {
    if (Array.isArray(arr)) {
      const obj = {};
      for (const i in source) {
        if (!arr.includes(i)) {
          obj[i] = source[i];
        }
      }
      return obj;
    }
  },
};
