// eslint-disable-next-line no-unused-vars
module.exports = options => {
  return async (ctx, next) => {
    // console.log('ctx', ctx);
    const user = await ctx.service.user.getUser(ctx.username);
    if (!user) {
      ctx.body = {
        status: 500,
        errMsg: '用户不存在',
      };
      return;
    }
    await next();
  };
};
