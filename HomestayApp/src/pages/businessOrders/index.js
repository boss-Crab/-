import React, { useState, useEffect } from 'react';
import { Tabs, Button } from 'antd-mobile';
import Lists from './components/Lists';
import { useHttpHook, useObserverHook } from '@/hooks';
import { CommonEnum } from '@/enums';
import { Http } from '@/utils';
import { isEmpty } from 'project-libs';
import { ErrorBoundary } from '@/components';
import { history } from 'umi';

import './index.less';

export default function (props) {
  const [page, setPage] = useState(CommonEnum.PAGE);
  const [orders, setOrders] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [type, setType] = useState(0)

  const invokeHttp = async (pageNum) => {
    const result = await Http({
      url: '/business/lists',
      body: {
        type
      }
    });
    return result;
  }

  const fetchOrder = async (pageNum) => {
    const result = await invokeHttp(pageNum);

    if (!isEmpty(result) && result.length <= page.pageSize) {
      setOrders(result);
      setShowLoading(true);
    } else {
      setShowLoading(false);
    }
  }

  // Tabs组件点击重新设置事件
  const handleChange = (e) => {
    setType(e.sub);
    // 将其设置为初始状态
    setPage(CommonEnum.PAGE);
    setOrders([]);
    setShowLoading(true);
  }

  const tabs = [
    { title: '未完成', sub: 0 },
    { title: '已完成', sub: 1 }
  ];

  /**
   * 1. 页面初始化请求接口
   * 2. 监听loading组件是否展示
   * 3. 修改page，pageNum+1，再次请求
   * 4. 拼装数据，然后page
   */
  useObserverHook('#' + CommonEnum.LOADING_ID, async (entries) => {
    if (entries[0].isIntersecting) {
      const result = await invokeHttp(page.pageNum + 1);
      if (!isEmpty(orders) && !isEmpty(result) && result.length === page.pageSize) {
        setOrders([...orders, ...result]);
        setPage({
          ...page,
          pageNum: page.pageNum + 1
        });
        setShowLoading(true);
      } else {
        setShowLoading(false);
      }
    }
  }, null);

  // 未登录则跳转登录页面
  useEffect(() => {
    if (!localStorage.getItem('businessname')) {
      history.push('/businesslogin');
    }
    fetchOrder(1);
  }, [type])

  // 返回管理员页面
  const handleClick = () => {
    history.push('/business');
  }

  return (
    <ErrorBoundary>
      <div className='order-page'>
        <Tabs
          tabs={tabs}
          onChange={handleChange}
        >

          {/* 未完成列表 */}
          <div className='tab'>
            <Lists orders={orders} type={0} showLoading={showLoading} />
          </div>

          {/* 已完成列表 */}
          <div className='tab'>
            <Lists orders={orders} type={1} showLoading={showLoading} />
          </div>

        </Tabs>
        <Button style={{'marginTop': '-40px'}} type='warning' onClick={handleClick}>返回</Button>
      </div>
    </ErrorBoundary>
  )
}