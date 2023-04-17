// const Service = require('egg').Service;
const BaseService = require('./base');

class HouseService extends BaseService {

  // 对限制条件进行解耦
  commonAttr(app) {
    return {
      // 根据显示次数进行降序排列
      order: [
        [ 'showCount', 'DESC' ],
      ],
      attributes: {
        // 排除不需显示的信息
        exclude: [ 'startTime', 'endTime', 'publishTime' ],
      },
      include: [
        {
          model: app.model.Imgs,
          limit: 1,
          attributes: [ 'url' ],
        },
      ],
    };
  }

  // 热门民宿
  async hot() {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.House.findAll({
        ...this.commonAttr(app),
        // 限制查询的个数
        limit: 4,
      });

      return result;
    });
  }

  // 搜索民宿
  async search(params) {
    return this.run(async (ctx, app) => {
      const { lte, gte, like } = app.Sequelize.Op;
      const where = {
        cityCode: Array.isArray(params.code) ? params.code[0] : params.code,
        startTime: {
          // 小于等于开始时间
          [lte]: params.startTime,
        },
        endTime: {
          // 大于等于结束时间
          [gte]: params.endTime,
        },
        name: {
          [like]: '%' + params.houseName + '%',
        },
      };

      // 如果不搜索民宿名称，则删除where.name
      if (!params.houseName) {
        delete where.name;
      }

      const result = await ctx.model.House.findAll({
        ...this.commonAttr(app),
        // 限制查询的个数
        limit: 8,
        offset: (params.pageNum - 1) * params.pageSize,
        where,
      });

      return result;
    });
  }

  // 搜索所有民宿
  async searchall() {
    return this.run(async (ctx, app) => {

      const result = await ctx.model.House.findAll({
        include: [
          {
            model: app.model.Imgs,
            limit: 1,
            attributes: [ 'url' ],
          },
        ],
      });
      return result;
    });
  }

  // 获取民宿详情
  async detail(id) {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.House.findOne({
        where: {
          id,
        },
        include: [
          {
            model: app.model.Imgs,
            attributes: [ 'url' ],
          },
        ],
      });

      await ctx.model.House.update({
        showCount: result.showCount + 1,
      }, {
        where: {
          id,
        },
      });
      return result;
    });
  }

  // 添加民宿
  // eslint-disable-next-line no-unused-vars
  async addhouse(name, info, addres, price, cityCode, startTime, endTime, imgurl, publishTime) {
    // eslint-disable-next-line no-unused-vars
    return this.run(async (ctx, app) => {
      // 添加民宿
      const result = await ctx.model.House.create({
        name,
        info,
        addres,
        price,
        cityCode,
        startTime,
        endTime,
        publishTime,
      });

      // 获取当前民宿的id
      const house = await ctx.model.House.findOne({
        where: {
          name,
          addres,
          cityCode,
        },
      });

      // 添加图片地址
      // eslint-disable-next-line no-unused-vars
      const imgs = await ctx.model.Imgs.create({
        url: imgurl,
        houseId: house.id,
        createTime: publishTime,
      });

      return result;
    });
  }

  // 获取民宿
  async getHouse(name, addres) {
    return this.run(async () => {
      const { ctx } = this;
      const result = await ctx.model.House.findOne({
        where: {
          name,
          addres,
        },
      });
      // console.log('result', result);
      return result;
    });
  }

  // 删除民宿
  async delete(id) {
    return this.run(async () => {
      const { ctx } = this;
      // 删除民宿
      const result = await ctx.model.House.destroy({
        where: {
          id,
        },
      });

      // 删除数据库中民宿相关的图片信息
      await ctx.model.Imgs.destroy({
        where: {
          houseId: id,
        },
      });
      // console.log('result', result);
      return result;
    });
  }

}

module.exports = HouseService;
