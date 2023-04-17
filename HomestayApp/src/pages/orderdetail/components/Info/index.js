import React, { useState, useEffect } from 'react';
import { Button, Toast, Calendar } from 'antd-mobile';
import dayjs from 'dayjs';
import { timer } from '@/utils';
import { Http } from '@/utils';
import { useHttpHook } from '@/hooks';

export default function (props) {

  // const getusername = () => {
  //   const result = Http({
  //     url: '/user/getusername',
  //     body: {
  //       userid: props?.item?.userId,
  //     }
  //   });
  //   console.log('result', result);
  //   return result;
  // }

  const [username, setUsername] = useState('');

  const user = async (pageNum) => {
    const result = await Http({
      url: '/user/getusername',
      body: {
        userid: props?.item?.userId,
      },
    });
    return result;
  }

  const getUser = async () => {
    const result = await user();
    // console.log(result);
    setUsername(result.username);
  }
  useEffect(()=>{
    getUser();
  }, [])

  return (
    <div className='info'>
      <div className='info-title'>{props?.item?.house?.name}</div>
      <div className='info-name'>用户名称：{username}</div>
      <div className='info-time'>用户付款时间：{timer(props?.item?.createTime, '')}</div>
      <div className='info-time'>居住时间：{timer(props?.item?.startTime, '')} 12:00:00 ~ {timer(props?.item?.endTime, '')} 12:00:00</div>
      <div className='info-time'>民宿发布时间：{timer(props?.item?.house?.publishTime)}</div>
      <div className='info-time'>出租允许时间：{timer(props?.item?.house?.startTime, '')} ~ {timer(props?.item?.house?.endTime, '')}</div>
    </div>
  )
}