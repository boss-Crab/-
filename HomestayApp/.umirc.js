import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  mock: false,
  proxy: {
    '/api': {
      'target': 'http://127.0.0.1:7001/',
      'changeOrigin': true,
    }
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/',
          component: './home/index',
          title: '首页'
        },
        {
          path: '/order',
          component: './order/index',
          title: '订单',
          auth: true
        },
        {
          path: '/user',
          component: './user/index',
          title: '我的',
          auth: true
        },
        {
          path: '/user/edit',
          component: './user/edit',
          title: '设置用户'
        },
        {
          path: '/business',
          component: './business',
          title: '商家'
        },
        {
          path: '/businesslogin',
          component: './businessLogin',
          title: '商家登录',
        },
        {
          path: '/businessregister',
          component: './businessRegister',
          title: '商家注册',
        },
        {
          path: '/businessorder',
          component: './businessOrders',
          title: '商家历史订单',
        },
        {
          path: '/businessoperate',
          component: './businessOperate',
          title: '订单操作',
        },
        {
          path: '/orderdetail',
          component: './orderdetail',
          title: '订单详情',
        },
        {
          path: '/addhouse',
          component: './addhouse',
          title: '添加民宿',
        },
        {
          path: '/allhouse',
          component: './allhouse',
          title: '民宿信息',
        },
        {
          path: '/business/edit',
          component: './business/edit',
          title: '设置用户'
        },
        {
          path: '/search',
          component: './search/index',
          title: '搜索'
        },
        {
          path: '/observer',
          component: './observer',
          title: 'observer'
        },
        {
          path: '/house',
          component: './house/index',
          title: '房屋详情'
        },
        {
          path: '/login',
          component: './login',
          title: '登录'
        },
        {
          path: '/register',
          component: './register',
          title: '注册'
        },
      ]
    },
  ],
});
