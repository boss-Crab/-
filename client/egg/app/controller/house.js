// const Controller = require('egg').Controller;
const BaseController = require('./base');

class HouseController extends BaseController {
  // 热门民宿信息接口
  async hot() {
    // eslint-disable-next-line no-unused-vars
    const { ctx, app } = this;
    const result = await ctx.service.house.hot();

    this.success(result);
  }

  // 搜索页面接口
  async search() {
    // eslint-disable-next-line no-unused-vars
    const { ctx, app } = this;
    const result = await ctx.service.house.search(ctx.params());

    this.success(result);
  }

  // 民宿详情接口
  async detail() {
    // eslint-disable-next-line no-unused-vars
    const { ctx, app } = this;
    const result = await ctx.service.house.detail(ctx.params('id'));

    this.success({
      info: result,
      banner: result.imgs,
    });
  }
}

module.exports = HouseController;
