import React, { useState, useEffect } from 'react';
import { SearchBar, ActivityIndicator, Button, Toast } from 'antd-mobile';
import { useHttpHook, useObserverHook, useImgHook } from '@/hooks';
import { useLocation, history } from 'umi';
import { ShowLoading } from '@/components';
import { CommonEnum } from '@/enums';
import { Http, timer } from '@/utils';
import dayjs from 'dayjs';

import './index.less'

export default function (props) {
  const [page, setPage] = useState(CommonEnum.PAGE);
  // 热门民宿数组
  const [houseLists, setHouseLists] = useState([]);
  // loading的状态值
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // 如果管理员未登录，则跳转管理员登录页面
    if (!localStorage.getItem('businessname')) {
      history.push('/businesslogin');
    }
  }, [])

  // 搜索请求
  const [houses, loading] = useHttpHook({
    url: '/house/searchall',
  });

  // 跳转添加民宿页面
  const onClickAddHouse = () => {
    history.push('/addhouse');
  }

  // 返回管理员页面
  const onClickBack = () => {
    history.push('/business');
  }

  useImgHook('.item-img', (entries) => { }, null);

  // 4. 监听loading的变化，拼装数据
  useEffect(() => {
    if (!loading && houses) {
      if (houses.length) {
        setHouseLists([...houseLists, ...houses]);
        if (houses.length < page.pageSize) {
          setShowLoading(false);
        }
      } else {
        setShowLoading(false);
      }
    }
  }, [loading])

  // 删除民宿
  const handleCancle = async (id) => {
    const result = await Http({
      url: '/house/delete',
      body: {
        id,
      }
    });
    if (result) {
      Toast.success('取消订单成功');
      window.location.reload();
    }
  }

  return (
    <div className='search-page'>

      <div className='operate'>
        <div className='addhouse' onClick={onClickAddHouse}>添加</div>
        <div className='back' onClick={onClickBack}>返回</div>
      </div>

      {/* 搜索结果 */}
      {!houseLists.length
        ? <ActivityIndicator toast />
        : <div className='result-house'>
          {houseLists?.map(item => (
            <div className='item' key={item.id}>
              <img alt='img' className='item-img' src={require('../../assets/img.jpg')} data-src={item?.imgs[0]?.url}></img>
              <div className='item-right'>
                <div className='house-title'>{item.name}</div>
                <div className='house-delete'>
                  <Button type='warning' size='small' onClick={()=>handleCancle(item.id)} style={{ 'width': '70px', 'height': '30px' }}>删除民宿</Button>
                </div>
                <div className='publishtime'>发布时间:{dayjs(item.publishTime).format('YYYY-MM-DD')}</div>
                <div className='agreetime'>出租时间:{dayjs(item.startTime).format('YYYY-MM-DD')} ~ {dayjs(item.endTime).format('YYYY-MM-DD')}</div>
                <div className='price'>￥{item.price}/天</div>
              </div>
            </div>
          ))}
        </div>}
    </div>
  )
}