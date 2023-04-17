'use strict';

// const Controller = require('egg').Controller;
const md5 = require('md5');
const BaseController = require('./base');

class UserController extends BaseController {
  async jwtSign({ id, username }) {
    // eslint-disable-next-line no-unused-vars
    const { ctx, app } = this;
    // const username = ctx.params('username');
    // 使用用户密钥进行用户签名
    const token = app.jwt.sign({
      id,
      username,
    }, app.config.jwt.secret);

    // 设置会话
    // ctx.session[username] = 1;

    // 将token保存在redis中，并设置有效时间
    await app.redis.set(username, token, 'EX', app.config.redisExpire);

    return token;
  }

  parseResult(ctx, result) {
    return {
      // 排除不需显示的密码信息
      ...ctx.helper.unPick(result.dataValues, [ 'password' ]),
      // 将时间转换为时间戳
      createTime: ctx.helper.timestamp(result.createTime),
    };
  }

  // 注册用户
  async register() {
    const { ctx, app } = this;
    // 获取添加的用户信息
    const params = ctx.request.body.value;
    // 查询用户
    const user = await ctx.service.user.getUser(params.username);

    // 如果用户存在则注册失败
    if (user) {
      // BaseController中的报错函数
      this.error('用户已经存在');
      return;
    }

    // 用户不存在则添加用户
    const result = await ctx.service.user.add({
      ...params,
      // 对密码进行加密
      password: md5(params.password + app.config.salt),
      // 注册时间
      createTime: ctx.helper.time(),
    });

    if (result) {
      const token = await this.jwtSign({
        id: result.id,
        username: result.username,
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
    const { username, password } = ctx.request.body.value;
    const user = await ctx.service.user.getUser(username, password);


    if (user) {
      const token = await this.jwtSign({
        id: user.id,
        username: user.username,
      });

      // BaseController中的success成功函数
      this.success({
        ...this.parseResult(ctx, user),
        token,
      });
    } else {
      // BaseController中的报错函数
      this.error('该用户不存在');
    }
  }

  // 用户详情
  async detail() {
    const { ctx } = this;
    const user = await ctx.service.user.getUser(ctx.username);

    if (user) {
      // BaseController中的success成功函数
      this.success({
        // 不需显示密码
        ...this.parseResult(ctx, user),
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
      await app.redis.del(ctx.username);

      // BaseController中的success成功函数
      this.success('ok');

    } catch (error) {
      // BaseController中的报错函数
      this.error('退出登录失败');
    }
  }

  // 修改用户信息
  async edit() {
    const { ctx } = this;

    const result = ctx.service.user.edit({
      ...ctx.params(),
      updateTime: ctx.helper.time(),
    });

    this.success(result);
  }

  // 获取用户名称
  async getusername() {
    const { ctx } = this;
    const { userid } = ctx.request.body;
    const result = await ctx.service.user.getUsername(userid);
    console.log(result);
    this.success(result);
  }
}

module.exports = UserController;

