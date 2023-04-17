import React, { useState, useEffect } from 'react';
import Banner from './components/Banner';
import Info from './components/Info';
import Lists from './components/Lists';
import { useStoreHook } from 'think-react-store';
import { useObserverHook } from '@/hooks';
import { CommonEnum } from '@/enums';
import { useLocation } from 'umi';

import './index.less'

export default function (props) {

  const { house: { detail, getDetailAsync, getCommentsAsync, comments, reloadComments, reloadCommentsNum, showLoading, resetData, order, hasOrderAsync, addOrderAsync, delOrderAsync } } = useStoreHook();

  const { state } = useLocation();

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
    // 获取民宿评论
    // console.log(query);
    getCommentsAsync({
      id: state?.item?.houseId
    })
  }, [reloadCommentsNum]);

  return (
    <div className='house-page'>
      {/* banner */}
      <Banner banner={state?.item?.house?.imgs}></Banner>

      {/* 房屋信息 */}
      <Info item={state?.item}></Info>

      {/* 评论列表 */}
      <Lists lists={comments} showLoading={showLoading}></Lists>
    </div>
  )
}