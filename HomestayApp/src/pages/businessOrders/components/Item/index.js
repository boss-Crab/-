import React, { useState, useEffect } from 'react';
import { Button, Toast } from 'antd-mobile';
import { Http, timer } from '@/utils';
import { history } from 'umi';

export default function (props) {

  const handleClick = (house) => {
    // console.log('props.orders', props.item);
    history.push({
      pathname: '/orderdetail',
      state: {
        item: props.item,
      }
    })
  }

  return (
    <div className='order-item' onClick={()=>handleClick(props?.house)}>
      <img alt='order' src={props?.house?.imgs[0]?.url}></img>
      <div className='center'>
        <div className='title'>{props?.house?.name}</div>
        <div className='price'>￥{props?.house?.price}</div>
        <div className='time'>{timer(props?.createTime, 'day')}</div>
      </div>
    </div>
  )
}