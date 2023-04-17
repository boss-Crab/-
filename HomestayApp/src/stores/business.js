import { Http } from '@/utils';
import { Toast } from 'antd-mobile';
import { history } from 'umi';
import { cookie, urlGet } from 'project-libs';

export default {
  state: {
    id: undefined,
    businessname: undefined,
    avatar: undefined,
    phone: undefined,
    sign: undefined
  },

  reducers: {
    getBusiness(state, payload) {
      return {
        ...state,
        ...payload
      }
    },

    editBusiness(state, payload) {
      return {
        ...state,
        ...payload
      }
    }
  },

  effects: {
    // 获取商家信息
    async getBusinessAsync(dispatch, rootState, payload) {
      const business = await Http({
        url: '/business/detail',
        body: payload
      });
      if (business) {
        dispatch({
          type: 'getBusiness',
          payload: business
        });
      }
    },

    // 商家登录请求
    async businessLoginAsync(dispatch, rootState, payload) {
      const result = await Http({
        url: '/business/businessLogin',
        body: payload
      });
      if (result) {
        // 本地存储器
        localStorage.setItem('businessToken', result.token);
        localStorage.setItem('businessname', result.businessname);
        localStorage.setItem('businessavatar', result.avatar);
        localStorage.setItem('businessid', result.id);
        localStorage.setItem('phone', result.phone);
        if (urlGet('from')) {
          history.push(urlGet('from'));
        } else {
          history.push('/business');
        }
        Toast.success('登录成功');
      }
    },

    // 商家注册
    async businessRegisterAsync(dispatch, rootState, payload) {
      // console.log('payload', payload);
      const result = await Http({
        url: '/business/businessRegister',
        body: payload
      });
      if (result) {
        cookie.set('business', result);
        localStorage.setItem('businessToken', result.token);
        localStorage.setItem('businessname', result.businessname);
        Toast.success('注册成功');
      }
    },

    // 商家退出登录
    async businessLogoutAsync(dispatch, rootState, payload) {
      await Http({
        url: '/business/businessLogout',
        body: payload
      });
      Toast.success('退出登录成功');
      localStorage.removeItem('businessToken');
      localStorage.removeItem('businessname');
      localStorage.removeItem('businessavatar');
      localStorage.removeItem('businessid');
      localStorage.removeItem('phone');

      location.href = '/business';
    }
  }
}
