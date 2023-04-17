import React, { useState, useEffect } from 'react';
import { Tabs, Button } from 'antd-mobile';
import Lists from './components/Lists';
import { useHttpHook, useObserverHook } from '@/hooks';
import { CommonEnum } from '@/enums';
import { Http } from '@/utils';
import { isEmpty } from 'project-libs';
import { ErrorBoundary } from '@/components';
import { history } from 'umi';

import './index.less'

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

  // 返回管理员页面
  const handleClick = () => {
    history.push('/business');
  }

  useEffect(() => {
    // 如果管理员未登录，则跳转管理员登录页面
    if (!localStorage.getItem('businessname')) {
      history.push('/businesslogin');
    }
    fetchOrder(1);
  }, [type])

  return (
    <ErrorBoundary>
      <div className='order-page'>
          {/* 未完成列表 */}
          <div className='tab'>
            <Lists orders={orders} type={0} showLoading={showLoading} />
          </div>
      </div>
      <Button onClick={handleClick} type='warning'>返回</Button>
    </ErrorBoundary>
  )
}