// const Controller = require('egg').Controller;
const BaseController = require('./base');

class OrdersController extends BaseController {
  // 获取订单信息
  async hasOrder() {
    const { ctx } = this;
    // const user = await ctx.service.user.getUser(ctx.username);
    const result = await ctx.service.orders.hasOrder({
      userId: ctx.userId,
      houseId: ctx.params('id'),
    });
    // console.log(result);
    this.success(result);
  }

  // 添加订单
  async addOrder() {
    const { ctx } = this;
    // const user = await ctx.service.user.getUser(ctx.username);
    // console.log(ctx.params('startTime'));
    // console.log(ctx.params('endTime'));
    const result = await ctx.service.orders.addOrder({
      userId: ctx.userId,
      houseId: ctx.params('id'),
      isPayed: 0,
      startTime: ctx.params('startTime'),
      endTime: ctx.params('endTime'),
      createTime: ctx.helper.time(),
    });
    // console.log('addOrder', result);
    this.success(result);
  }

  // 删除订单
  async delOrder() {
    const { ctx } = this;
    const user = await ctx.service.user.getUser(ctx.username);
    const result = await ctx.service.orders.delOrder(ctx.params('id'), user.id);
    this.success(result);
  }

  // 订单列表
  async lists() {
    const { ctx } = this;
    // const user = await ctx.service.user.getUser(ctx.username);
    const result = await ctx.service.orders.lists({
      ...ctx.params(),
      userId: ctx.userId,
    });
    this.success(result);
  }

  // 模拟支付过程
  async invokePay(params) {
    return {
      orderNumber: params.id + new Date().getTime(),
    };
  }

  // 支付
  async pay() {
    const { ctx } = this;
    const { id } = ctx.params();
    // 查询订单是否存在
    const order = await ctx.model.Orders.findByPk(id);

    if (order) {
      try {
        const beforePay = await this.invokePay({ id });
        const result = await ctx.service.orders.pay({
          id,
          orderNumber: beforePay,
        });
        this.success(result);
      } catch (error) {
        this.error('订单支付失败');
      }
    } else {
      this.error('订单不存在');
    }
    // this.success(result);
  }
}

module.exports = OrdersController;
