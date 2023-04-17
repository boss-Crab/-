import { Http } from '@/utils';
import { Toast } from 'antd-mobile';
import { history } from 'umi';
import { CommonEnum } from '@/enums';

async function handleOrder(url, dispatch, payload) {
  // console.log('handleOrder payload', payload);
  const result = await Http({
    url,
    body: payload
  });
  // console.log('handleOrder', result);
  dispatch({
    type: 'setOrder',
    payload: result,
  })
}

export default {
  state: {
    detail: {},
    comments: [],
    page: CommonEnum.PAGE,
    showLoading: true,
    reloadCommentsNum: 0,
    order: null,
  },
  reducers: {

    getDetail(state, payload) {
      return {
        ...state,
        detail: payload
      }
    },

    setOrder(state, payload) {
      // console.log('setOrder', payload);
      return {
        ...state,
        order: payload
      }
    },

    getComments(state, payload) {
      return {
        ...state,
        comments: payload
      }
    },

    setShowLoading(state, payload) {
      return {
        ...state,
        showLoading: payload
      }
    },

    reloadComments(state, payload) {
      return {
        ...state,
        reloadCommentsNum: state.reloadCommentsNum + 1,
        page: {
          ...CommonEnum.PAGE,
          pageNum: state.page.pageNum + 1
        }
      }
    },

    resetData(state, payload) {
      return {
        ...state,
        // detail: {},
        comments: [],
        page: CommonEnum.PAGE,
        showLoading: true,
        reloadCommentsNum: 0,
        ...payload
      }
    }
  },
  effects: {
    // 获取民宿详情
    async getDetailAsync(dispatch, rootState, payload) {
      const detail = await Http({
        url: '/house/detail',
        body: payload
      });
      dispatch({
        type: 'getDetail',
        payload: detail
      })
    },

    // 获取民宿评论列表
    async getCommentsAsync(dispatch, rootState, payload) {
      const { comments, page } = rootState.house;
      const lists = await Http({
        url: '/comment/lists',
        body: {
          ...payload,
          pageSize: page.pageSize,
          pageNum: page.pageNum
        }
      });
      dispatch({
        type: 'getComments',
        payload: [...comments, ...lists],
      });
      dispatch({
        type: 'setShowLoading',
        payload: lists.length ? true : false,
      });
    },

    // 添加评论
    async addCommentsAsync(dispatch, rootState, payload) {
      const result = await Http({
        url: '/comment/add',
        body: payload
      });
      if (result) {
        dispatch({
          type: 'resetData',
          payload: {}
        })
      }
    },

    // 获取订单信息
    async hasOrderAsync(dispatch, rootState, payload) {
      await handleOrder('/orders/hasOrder', dispatch, payload);
    },

    // 添加订单
    async addOrderAsync(dispatch, rootState, payload) {
      await handleOrder('/orders/addOrder', dispatch, payload);
    },

    // 删除订单
    async delOrderAsync(dispatch, rootState, payload) {
      await handleOrder('/orders/delOrder', dispatch, payload);
    },

    // 添加民宿
    async addHouseAsync(dispatch, rootState, payload) {
      const result = await Http({
        url: '/house/addhouse',
        body: payload
      });
      if (result) {
        Toast.success('编辑成功');
        history.push('/allhouse');
      }
    },

  }
};