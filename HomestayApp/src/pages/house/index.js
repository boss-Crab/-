import React, { useState, useEffect } from 'react';
import Banner from './components/Banner';
import Footer from './components/Footer';
import Info from './components/Info';
import Lists from './components/Lists';
import { useStoreHook } from 'think-react-store';
import { useObserverHook } from '@/hooks';
import { CommonEnum } from '@/enums';
import { useLocation } from 'umi';

import './index.less'

export default function (props) {

  const { house: { detail, getDetailAsync, getCommentsAsync, comments, reloadComments, reloadCommentsNum, showLoading, resetData, order, hasOrderAsync, addOrderAsync, delOrderAsync } } = useStoreHook();

  const { query } = useLocation();

  const handleBtnClick = (id) => {
    if (!id) {
      // id不存在则添加
      addOrderAsync({
        id: query?.id
      });
    } else {
      // id存在则删除
      delOrderAsync({
        id: query?.id,
      });
    }
  };

  /**
   * 1. 监听loading是否展示出来
   * 2. 触发reload，修改分页
   * 3. 监听reload变化，重新请求接口
   * 4. 拼装数据
   */
  useObserverHook('#' + CommonEnum.LOADING_ID, (entries) => {
    if (comments && comments.length && showLoading && entries[0].isIntersecting) {
      reloadComments();
    }
  }, [comments, showLoading]);

  useEffect(() => {
    // 获取民宿详情
    getDetailAsync({
      id: query?.id
    })
  }, []);

  useEffect(() => {
    // 获取民宿评论
    getCommentsAsync({
      id: query?.id
    })
  }, [reloadCommentsNum]);

  useEffect(() => {
    // 获取订单信息
    hasOrderAsync({
      id: query?.id
    });
  }, [])

  useEffect(() => {
    return () => {
      resetData({
        detail: {}
      });
    }
  }, []);

  return (
    <div className='house-page'>
      {/* banner */}
      <Banner banner={detail?.banner}></Banner>

      {/* 房屋信息 */}
      <Info detail={detail?.info} order={order} btnClick={handleBtnClick}></Info>

      {/* 评论列表 */}
      <Lists lists={comments} showLoading={showLoading}></Lists>

      {/* footer */}
      <Footer></Footer>
    </div>
  )
}