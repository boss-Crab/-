'use strict';

// const Service = require('egg').Service;
const md5 = require('md5');
const BaseService = require('./base');

// 操作数据库
class UserService extends BaseService {

  // 获取用户
  async getUser(username, password) {
    return this.run(async () => {
      const { ctx, app } = this;
      const _where = password ? { username, password: md5(password + app.config.salt) } : { username };
      const result = await ctx.model.User.findOne({
        where: _where,
      });
      return result;
    });
  }

  // 获取用户名称
  async getUsername(userid) {
    return this.run(async () => {
      const { ctx } = this;
      const result = await ctx.model.User.findOne({
        where: {
          id: userid,
        },
      });
      // console.log('result', result);
      return result;
    });
  }

  // 添加用户
  async add(params) {
    return this.run(async () => {
      const { ctx } = this;
      const result = await ctx.model.User.create(params);
      return result;
    });
  }

  // 修改用户信息
  async edit(params) {
    return this.run(async ctx => {
      // console.log('params', params);
      // console.log('ctx.username', ctx.username);
      const result = await ctx.model.User.update(params, {
        where: {
          username: ctx.username,
        },
      });
      return result;
    });
  }
}

module.exports = UserService;
