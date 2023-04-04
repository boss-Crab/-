import React, { useState, useEffect, memo } from 'react';
import { Picker, List, Calendar, Button, Toast } from 'antd-mobile';
import dayjs from 'dayjs';
import { useHttpHook } from '@/hooks';
import { history } from 'umi';
import { ErrorBoundary } from '@/components';

// home搜索组件
function Search(props) {

  // 可选城市的value
  const [selectedCity, setSelectedCity] = useState(['10001']);
  // 设置可选时间
  const [times, setTimes] = useState('可选时间');
  // 设置时间段选择是否可见，默认为false
  const [dataShow, setDataShow] = useState(false);

  // 设置选择城市的地点
  const handleCityChange = (value) => {
    setSelectedCity(value);
  }

  // 可选时间选择，出现日期选择显示
  const handleDate = () => {
    setDataShow(!dataShow);
  }

  // 将可选时间渲染为选中的时间段
  const handleDateConfirm = (startTime, endTime) => {
    setDataShow(!dataShow);
    setTimes(dayjs(startTime).format('YYYY-MM-DD') + '~' + dayjs(endTime).format('YYYY-MM-DD'));
  }

  // 搜索民宿点击按钮事件
  const handleClick = () => {
    if (times.includes('~')) {
      history.push({
        pathname: '/search',
        query: {
          // 选中城市的编码
          code: selectedCity,
          // 选中的开始时间
          startTime: times.split('~')[0],
          endTime: times.split('~')[1],
        }
      });
    } else {
      Toast.fail('请选择时间');
    }

  }

  useEffect(() => {

  }, [])

  return (
    // <ErrorBoundary>
      <div className='search'>
        {/**可选城市 */}
        <div className='search-addr'>
          {/* 可选城市选择器组件 */}
          {!props.citysLoading && <Picker
            title='城市'
            data={props?.citys}
            value={selectedCity}
            cascade={false}
            cols={1}
            onChange={handleCityChange}
          >
            <List.Item>可选城市</List.Item>
          </Picker>}
        </div>

        {/**可选时间 */}
        <div className='search-time' onClick={handleDate}>
          <p className='search-time_left'>出租时间</p>
          <p className='search-time_right'>{times}</p>
        </div>

        {/* 日期选择表 */}
        <Calendar
          visible={dataShow}
          onCancel={handleDate}
          onConfirm={handleDateConfirm}
        ></Calendar>

        {/**点击按钮 */}
        <Button onClick={handleClick} type='warning' size='large'>搜索民宿</Button>
      </div>
  )
}

function areEqual(prevProps, nextProps) {
  console.log(prevProps, nextProps);
  if (prevProps.citys === nextProps.citys && prevProps.citysLoading === nextProps.citysLoading) {
    return true;
  } else {
    return false;
  }
}

// 对Search组件进行缓存，当属性发生改变时，才重新渲染
export default memo(Search, areEqual);