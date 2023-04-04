import React, { useState, useEffect } from 'react';
import { SearchBar, ActivityIndicator } from 'antd-mobile';
import { useHttpHook, useObserverHook, useImgHook } from '@/hooks';
import { useLocation } from 'umi';
import { ShowLoading } from '@/components';
import { CommonEnum } from '@/enums';
import { nanoid } from 'nanoid'

import './index.less'

export default function (props) {
  // 获取url参数内容
  const { query } = useLocation();

  // 顶部搜索栏所搜索的民宿
  const [houseName, setHouseName] = useState('');

  const [page, setPage] = useState(CommonEnum.PAGE);
  // 热门民宿数组
  const [houseLists, setHouseLists] = useState([]);
  // loading的状态值
  const [showLoading, setShowLoading] = useState(true);
  // 搜索栏提交民宿名称
  const [houseSubmitName, setHouseSubmitName] = useState('');

  // 向/house/search发送mock请求
  const [houses, loading] = useHttpHook({
    url: '/house/search',
    body: {
      ...page,
      houseName,
      code: query?.code,
      startTime: query?.startTime + ' 00:00:00',
      endTime: query?.endTime + ' 23:59:59',
    },
    watch: [page.pageNum, houseSubmitName]
  });

  /**
   * 1. 监听loading是否展示出来
   * 2. 修改分页数据
   * 3. 监听分页数据的修改，发送接口，请求下一页数据
   * 4. 监听loading的变化，拼装数据
   */
  useObserverHook('#' + CommonEnum.LOADING_ID, (entries) => {
    if (!loading && entries[0].isIntersecting) {
      setPage({
        ...page,
        // 当前的页面号数+1
        pageNum: page.pageNum + 1
      });
    }
  }, null);

  useImgHook('.item-img', (entries) => {}, null);

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

  // 搜索栏更改事件
  const handleChange = (value) => {
    setHouseName(value);
  };

  const _handleSubmit = (value) => {
    setHouseName(value);
    setHouseSubmitName(value);
    setPage(CommonEnum.PAGE);
    setHouseLists([]);
  }

  // 搜索栏取消事件
  const handleCancel = () => {
    _handleSubmit('');
  };

  // 搜索栏提交事件
  const handleSubmit = (value) => {
    _handleSubmit(value);
  };


  return (
    <div className='search-page'>
      {/* 顶部搜索栏 */}
      <SearchBar
        placeholder='搜索民宿'
        value={houseName}
        onChange={handleChange}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />

      {/* 搜索结果 */}
      {!houseLists.length
        ? <ActivityIndicator toast />
        : <div className='result'>
          {houseLists?.map(item => (
            <div className='item' key={item.id}>
              <img alt='img' className='item-img' src={require('../../assets/img.jpg')} data-src={item?.imgs[0]?.url}></img>
              <div className='item-right'>
                <div className='title'>{item.name}</div>
                <div className='price'>￥{item.price}</div>
              </div>
            </div>
          ))}
          <ShowLoading showLoading={showLoading}></ShowLoading>
        </div>}

    </div>
  )
}