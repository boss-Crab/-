'use strict';

// const Service = require('egg').Service;
const md5 = require('md5');
const BaseService = require('./base');

// 操作数据库
class UserService extends BaseService {

  // 获取用户
  async getBusiness(businessname, businesspassword) {
    return this.run(async () => {
      const { ctx, app } = this;
      const _where = businesspassword ? { businessname, businesspassword: md5(businesspassword + app.config.salt) } : { businessname };
      const result = await ctx.model.Business.findOne({
        where: _where,
      });
      return result;
    });
  }

  // 添加用户
  async add(params) {
    return this.run(async () => {
      const { ctx } = this;
      const result = await ctx.model.Business.create(params);
      return result;
    });
  }

  // 修改用户信息
  async edit(params) {
    return this.run(async ctx => {
      // console.log('params', params);
      // console.log(' ctx.businessname', ctx.businessname);
      // console.log('ctx', ctx);
      const result = await ctx.model.Business.update(params, {
        where: {
          businessname: ctx.businessname,
        },
      });
      return result;
    });
  }

  // 查询订单
  async hasOrder(params) {
    console.log(params);
    return this.run(async ctx => {
      const result = await ctx.model.Orders.findOne({
        where: {
          userId: params.userId,
          houseId: params.houseId,
        },
      });
      // console.log(result);
      return result;
    });
  }

  // 获取订单列表
  async lists(params) {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.Orders.findAll({
        where: {
          finished: params.finished,
        },
        include: [
          {
            model: app.model.House,
            as: 'house',
            include: [
              {
                model: app.model.Imgs,
                attributes: [ 'url' ],
                limit: 1,
              },
            ],
          },
        ],
      });
      return result;
    });
  }

  // 删除订单
  async delOrder(id) {
    return this.run(async ctx => {
      const result = await ctx.model.Orders.destroy({
        where: {
          id,
          finished: 0,
        },
      });
      return result;
    });
  }
}

module.exports = UserService;
