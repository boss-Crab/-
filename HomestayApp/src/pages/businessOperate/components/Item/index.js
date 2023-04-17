import React, { useState, useEffect } from 'react';
import { Button, Toast } from 'antd-mobile';
import { Http, timer } from '@/utils';

export default function (props) {
  const [state, setState] = useState()

  useEffect(() => {

  }, [])

  // 完成订单
  const handleComplete = async () => {
    const result = await Http({
      url: '/business/finished',
      body: {
        id: props?.id
      }
    });
    if (result) {
      Toast.success('完成订单');
      window.location.reload();
    }
  }

  // 取消订单
  const handleCancle = async () => {
    const result = await Http({
      url: '/business/cancel',
      body: {
        id: props?.id
      }
    });
    if (result) {
      Toast.success('取消订单成功');
      window.location.reload();
    }
  }

  const renderFinish = () => {
    switch (props.type) {
      case 0:
        return <div><Button type='warning' size='small' onClick={handleCancle}>取消订单</Button><Button style={{'marginTop': '30px'}} type='warning' size='small' onClick={handleComplete}>订单完成</Button></div>
      case 1:
        return <Button size='small'>已完成</Button>
      default:
        break;
    }
  };

  return (
    <div className='order-item'>
      <img alt='order' src={props?.house?.imgs[0]?.url}></img>
      <div className='center'>
        <div className='title'>{props?.house?.name}</div>
        <div className='price'>￥{props?.house?.price}</div>
        <div className='time'>{timer(props?.createTime, 'day')}</div>
      </div>
      <div className='pay'>
        {renderFinish()}
      </div>
    </div>
  )
}