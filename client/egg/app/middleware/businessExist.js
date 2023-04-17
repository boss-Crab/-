// eslint-disable-next-line no-unused-vars
module.exports = options => {
  return async (ctx, next) => {
    const business = await ctx.service.business.getBusiness(ctx.businessname);
    if (!business) {
      ctx.body = {
        status: 500,
        errMsg: '用户不存在',
      };
      return;
    }
    await next();
  };
};
