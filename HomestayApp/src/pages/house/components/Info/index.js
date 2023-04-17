import React, { useState, useEffect } from 'react';
import { Button, Toast, Calendar } from 'antd-mobile';
import dayjs from 'dayjs';
import { timer } from '@/utils';

export default function (props) {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');


  // 设置可选时间
  const [times, setTimes] = useState('可选时间');
  // 设置时间段选择是否可见，默认为false
  const [dataShow, setDataShow] = useState(false);
  // 可选时间选择，出现日期选择显示
  const handleDate = () => {
    setDataShow(!dataShow);
  }
  // 将可选时间渲染为选中的时间段
  const handleDateConfirm = (startTime, endTime) => {
    setDataShow(!dataShow);

    // 时间选择是否在允许范围
    if (Date.parse(dayjs(startTime).format('YYYY-MM-DD')) > Date.parse(timer(props?.detail?.startTime)) && Date.parse(dayjs(endTime).format('YYYY-MM-DD')) < Date.parse(timer(props?.detail?.endTime))) {

      // 显示选择时间
      setTimes(dayjs(startTime).format('YYYY-MM-DD') + '~' + dayjs(endTime).format('YYYY-MM-DD'));

      // 将选择开始与结束时间赋值
      setStartTime(dayjs(startTime).format('YYYY-MM-DD'));
      setEndTime(dayjs(endTime).format('YYYY-MM-DD'));

    } else {
      Toast.fail('出租时间不允许');
    }
  }


  // 添加订单或者取消订单
  const handleOrder = (id) => {
    // 用户选择出租时间存在则允许添加或取消订单
    if (startTime && endTime) {
      props?.btnClick(id, startTime, endTime);
    } else {
      Toast.fail('请补充完整信息');
      return;
    }
  }

  const renderBtn = () => {
    // order里面没有id，说明订单一定不存在
    // console.log(props);
    if (!props?.order?.id || props?.order?.finished === 1) {
      return <Button className='info-btn' type='warning' onClick={() => handleOrder()}>预定</Button>
    }

    // 已经有订单了，处于未支付状态
    if (props?.order?.isPayed === 0) {
      return <Button className='info-btn' type='ghost' onClick={() => handleOrder(props.order?.id)}>取消预定</Button>
    }

    // 已经有订单了，处于已支付状态
    if (props?.order?.isPayed === 1) {
      return <Button className='info-btn' type='ghost'>居住中</Button>
    }
  }

  useEffect(() => {
    if ((props.startTime && props.endTime)) {
      setStartTime(props.startTime);
      setEndTime(props.endTime);
    }
  }, [])

  // 时间选择是否存在，如果不存在，则显示时间选择
  const renderTime = () => {
    if (props.startTime && props.endTime) {
      return (
        <div>
          <div className='info-time'>出租开始时间：{props.startTime}</div>
          <div className='info-time'>出租结束时间：{props.endTime}</div>
        </div>
      )
    } else {
      return (
        <div>
          <div className='choose-time' onClick={handleDate}>
            <div className='choose-time_left'>出租时间：</div>
            <div className='choose-time_right'>{times}</div>
          </div>
          <Calendar
            visible={dataShow}
            onCancel={handleDate}
            onConfirm={handleDateConfirm}
          ></Calendar>
        </div>)
    }
  }

  return (
    <div className='info'>
      <div className='info-title'>{props?.detail?.name}</div>
      <div className='info-msg'>简介：{props?.detail?.info}</div>
      <div className='info-price'>价格/天：{props?.detail?.price}</div>
      <div className='info-time'>发布时间：{timer(props?.detail?.publishTime)}</div>
      <div className='info-time'>出租允许时间：{timer(props?.detail?.startTime, '')} ~ {timer(props?.detail?.endTime, '')}</div>

      {renderTime()}
      {renderBtn()}
    </div>
  )
}