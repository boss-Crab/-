import React, { useState, useEffect } from 'react';
import { List, ImagePicker, Toast, InputItem, Button, Picker, Calendar } from 'antd-mobile'
import { createForm } from 'rc-form';
import { useStoreHook } from 'think-react-store';
import { useHttpHook } from '@/hooks';
import dayjs from 'dayjs';

import './index.less';
import { number } from 'prop-types';

function Edit(props) {
  const { getFieldProps, validateFields } = props.form;

  const { house: { addHouseAsync } } = useStoreHook();

  // 获取stores中的editUserAsync方法
  const [files, setFiles] = useState([{}]);

  // 可选城市的value
  const [selectedCity, setSelectedCity] = useState(['10001']);
  // 设置可选时间
  const [times, setTimes] = useState('可选时间');
  // 设置时间段选择是否可见，默认为false
  const [dataShow, setDataShow] = useState(false);
  // 设置民宿允许居住开始时间
  const [startTime, setStartTime] = useState('');
  // 设置民宿允许居住结束时间
  const [endTime, setEndTime] = useState('');

  // 发送请求并接受城市数组
  const [citys, citysLoading] = useHttpHook({
    url: '/commons/citys'
  });
  // 发送请求并接受热门民宿数组
  const [houses] = useHttpHook({
    url: '/house/hot'
  });

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
    setStartTime(dayjs(startTime).format('YYYY-MM-DD'));
    setEndTime(dayjs(endTime).format('YYYY-MM-DD'));
  }

  // 图片上传
  const handleChange = (files) => {
    if (files[0]?.file?.size / 1024 / 1024 > 0.5) {
      Toast.fail('图片大小不能大于0.5M');
      return;
    }
    setFiles(files);
  }


  // 提交用户照片、电话、签名事件
  const handleSubmit = () => {
    if (!files.length) {
      Toast.fail('请上传图片');
      return;
    }

    // 提交民宿信息
    validateFields((error, value) => {
      if (error || startTime === '' || endTime === '') {
        // console.log(dayjs(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss'));
        Toast.fail('请将信息补充完整');
        return;
      } else {
        // console.log(new Date().getTime());
        // console.log(dayjs(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss'));
        // 添加民宿
        addHouseAsync({
          name: value.name,
          info: value.info,
          addres: value.addres,
          price: value.price,
          cityCode: selectedCity[0],
          startTime,
          endTime,
          imgurl: files[0].url,
          publishTime: dayjs(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss'),
        });
      }
    });
  }

  return (
    <div className='user-edit'>
      <List>
        <ImagePicker
          files={files}
          selectable={files.length < 1}
          onChange={handleChange}
        />
        <InputItem
          {...getFieldProps('name', {
            rules: [{ required: true }],
          })}
          placeholder='民宿名称'
        >
          民宿名称:
        </InputItem>
        <InputItem
          {...getFieldProps('info', {
            rules: [{ required: true }],
          })}
          placeholder='民宿简介'
        >
          民宿简介:
        </InputItem>
        <InputItem
          {...getFieldProps('addres', {
            rules: [{ required: true }],
          })}
          placeholder='民宿地址'
        >
          民宿地址:
        </InputItem>
        <InputItem
          {...getFieldProps('price', {
            rules: [{ required: true, }],
            type: 'number',
          })}
          placeholder='价格'
        >
          价格/天:
        </InputItem>
      </List>
      <div className='search'>
        {/**可选城市 */}
        <div className='search-addr'>
          {/* 可选城市选择器组件 */}
          {!citysLoading && <Picker
            title='城市'
            data={citys}
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
      </div>

      <Button type='warning' style={{ marginTop: '20px' }} onClick={handleSubmit}>添加民宿</Button>
    </div>
  )
}

export default createForm()(Edit);