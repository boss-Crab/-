import { cookie } from 'project-libs';
import { history } from 'umi';

export function onRouteChange(route) {
  // 获取当前路径
  const nowPath = route.routes[0].routes.filter(item => item.path === route.location.pathname);
  // 获取当前用户cookie
  // const isLogin = cookie.get('user');
  const isLogin = localStorage.getItem('token');

  // 如果用户未登录则跳转用户登录页面
  if (nowPath.length === 1 && nowPath[0].auth && !isLogin) {
    history.push({
      pathname: '/login',
      query: {
        from: route.location.pathname
      }
    });
  }
}