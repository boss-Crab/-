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

  // 搜索所有民宿页面
  async searchall() {
    // eslint-disable-next-line no-unused-vars
    const { ctx, app } = this;
    const result = await ctx.service.house.searchall(ctx.params());

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

  // 添加民宿
  async addhouse() {
    // eslint-disable-next-line no-unused-vars
    const { ctx, app } = this;

    // 获取参数
    const { name, info, addres, price, cityCode, startTime, endTime, imgurl, publishTime } = ctx.request.body;

    const house = await ctx.service.house.getHouse(name, addres);

    if (house) {
      this.error('民宿已经存在');
      return;
    }

    const result = await ctx.service.house.addhouse(name, info, addres, price, cityCode, startTime, endTime, imgurl, publishTime);
    this.success(result);
  }

  // 删除民宿
  async delete() {
    // eslint-disable-next-line no-unused-vars
    const { ctx, app } = this;

    // 获取参数
    // console.log(ctx.params());
    const { id } = ctx.params();
    // console.log(id);

    // 查询此民宿订单信息
    // const house = await ctx.service.house.hasHouse(id);
    const order = await ctx.service.orders.findOrder(id);

    if (order.finished === 0) {
      this.error('订单未完成,不可删除');
      return;
    }

    // 删除民宿
    const result = await ctx.service.house.delete(id);
    // 删除订单
    await ctx.service.orders.delete(id);

    this.success(result);
  }
}

module.exports = HouseController;
