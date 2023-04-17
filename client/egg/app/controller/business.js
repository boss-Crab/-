// const Controller = require('egg').Controller;
const md5 = require('md5');
const BaseController = require('./base');

class BusinessController extends BaseController {
  async jwtSign({ id, businessname }) {
    // eslint-disable-next-line no-unused-vars
    const { ctx, app } = this;

    // 使用用户密钥进行用户签名
    const token = app.jwt.sign({
      id,
      businessname,
    }, app.config.jwt.secret);

    // 设置会话
    // ctx.session[username] = 1;

    // 将token保存在redis中，并设置有效时间
    await app.redis.set(businessname, token, 'EX', app.config.redisExpire);

    return token;
  }

  parseResult(ctx, result) {
    return {
      // 排除不需显示的密码信息
      ...ctx.helper.unPick(result.dataValues, [ 'businesspassword' ]),
      // 将时间转换为时间戳
      createTime: ctx.helper.timestamp(result.createTime),
    };
  }

  // 注册用户
  async register() {
    const { ctx, app } = this;
    // 获取添加的用户信息
    const params = ctx.request.body.value;
    const avatar = ctx.request.body.avatar;
    // console.log('ctx.request.body.avatar', avatar);
    // 查询用户
    const business = await ctx.service.business.getBusiness(params.businessname);

    // 如果用户存在则注册失败
    if (business) {
      // BaseController中的报错函数
      this.error('用户已经存在');
      return;
    }

    // 用户不存在则添加用户
    const result = await ctx.service.business.add({
      ...params,
      // 对密码进行加密
      businesspassword: md5(params.businesspassword + app.config.salt),
      // 图片地址
      avatar,
      // 注册时间
      createTime: ctx.helper.time(),
    });

    if (result) {
      const token = await this.jwtSign({
        id: result.id,
        businessname: result.businessname,
      });

      // BaseController中的success成功函数
      this.success({
        ...this.parseResult(ctx, result),
        token,
      });

    } else {
      // BaseController中的报错函数
      this.error('注册失败');
    }
  }

  // 用户登录接口
  async login() {
    const { ctx } = this;
    const { businessname, businesspassword } = ctx.request.body.value;
    const business = await ctx.service.business.getBusiness(businessname, businesspassword);


    if (business) {
      const token = await this.jwtSign({
        id: business.id,
        businessname: business.businessname,
      });

      // BaseController中的success成功函数
      this.success({
        ...this.parseResult(ctx, business),
        token,
      });
    } else {
      // BaseController中的报错函数
      this.error('该用户不存在');
    }
  }

  // 用户详情
  async detail() {
    // eslint-disable-next-line no-unused-vars
    const { ctx, app } = this;
    const business = await ctx.service.business.getBusiness(ctx.businessname);

    if (business) {
      // BaseController中的success成功函数
      this.success({
        // 不需显示密码
        ...this.parseResult(ctx, business),
      });
    } else {
      // BaseController中的报错函数
      this.error('该用户不存在');
    }
  }

  // 退出登录
  async logout() {
    const { ctx, app } = this;
    try {
      // 清除
      await app.redis.del(ctx.businessname);

      // BaseController中的success成功函数
      this.success('ok');

    } catch (error) {
      // BaseController中的报错函数
      this.error('退出登录失败');
    }
  }

  // 用户
  async edit() {
    const { ctx } = this;
    // console.log('ctx', ctx.header);
    const result = ctx.service.business.edit({
      ...ctx.params(),
      updateTime: ctx.helper.time(),
    });

    this.success(result);
  }

  // 订单列表
  async lists() {
    const { ctx } = this;
    const { type } = ctx.request.body;
    const result = await ctx.service.business.lists({
      finished: type,
    });
    // console.log('result', result);
    this.success(result);
  }

  // 模拟支付过程
  async invokePay(params) {
    return {
      orderNumber: params.id + new Date().getTime(),
    };
  }

  // 完成订单
  async finished() {
    const { ctx } = this;
    const { id } = ctx.params();
    // 查询订单是否存在
    const order = await ctx.model.Orders.findByPk(id);
    if (order) {
      try {
        const beforePay = await this.invokePay({ id });
        const result = await ctx.service.orders.finished({
          id,
          orderNumber: beforePay,
        });
        this.success(result);
      } catch (error) {
        this.error('订单完成失败');
      }
    } else {
      this.error('订单不存在');
    }
  }

  // 完成订单
  async cancel() {
    const { ctx } = this;
    const { id } = ctx.params();
    // 查询订单是否存在
    const order = await ctx.model.Orders.findByPk(id);
    if (order) {
      try {
        const result = await ctx.service.business.delOrder(id);
        this.success(result);
      } catch (error) {
        this.error('订单完成失败');
      }
    } else {
      this.error('订单不存在');
    }
  }
}

module.exports = BusinessController;
