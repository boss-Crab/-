// const Controller = require('egg').Controller;
const BaseController = require('./base');

class CommonsController extends BaseController {
  async citys() {
    // eslint-disable-next-line no-unused-vars
    const { ctx, app } = this;
    try {
      const result = await app.httpclient.request('https://apis.imooc.com/?icode=3E9E9E2CAE1A5B65', {
        dataType: 'json',
      });

      if (result.status === 200) {
        this.success(result.data.citys);
      } else {
        this.error('获取城市数据失败');
      }
    } catch (error) {
      this.error('获取城市数据失败');
    }
  }
}

module.exports = CommonsController;
