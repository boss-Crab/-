'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const userExist = app.middleware.userExist();
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/detail', userExist, controller.user.detail);
  router.post('/api/user/logout', controller.user.logout);
  router.post('/api/user/edit', controller.user.edit);
  router.post('/api/user/getusername', controller.user.getusername);

  router.post('/api/commons/citys', controller.commons.citys);

  router.post('/api/house/hot', controller.house.hot);
  router.post('/api/house/search', controller.house.search);
  router.post('/api/house/detail', controller.house.detail);
  router.post('/api/house/searchall', controller.house.searchall);
  router.post('/api/house/addhouse', controller.house.addhouse);
  router.post('/api/house/delete', controller.house.delete);

  router.post('/api/comment/add', controller.comment.add);
  router.post('/api/comment/lists', controller.comment.lists);

  router.post('/api/orders/hasOrder', userExist, controller.orders.hasOrder);
  router.post('/api/orders/addOrder', userExist, controller.orders.addOrder);
  router.post('/api/orders/delOrder', userExist, controller.orders.delOrder);
  router.post('/api/orders/lists', userExist, controller.orders.lists);
  router.post('/api/orders/pay', userExist, controller.orders.pay);

  const businessExist = app.middleware.userExist();
  router.post('/api/business/businessRegister', controller.business.register);
  router.post('/api/business/businessLogin', controller.business.login);
  router.post('/api/business/detail', businessExist, controller.business.detail);
  router.post('/api/business/businessLogout', controller.business.logout);
  router.post('/api/business/edit', controller.business.edit);
  router.post('/api/business/lists', controller.business.lists);
  router.post('/api/business/finished', controller.business.finished);
  router.post('/api/business/cancel', controller.business.cancel);
};
