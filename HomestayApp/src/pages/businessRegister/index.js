import React, { useState, useEffect } from 'react';
import { List, ImagePicker, InputItem, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { history } from 'umi';
import { useStoreHook } from 'think-react-store';

import './index.less';

function register(props) {
  // 获取stores中user.js中的异步登录方法
  const { business: { businessRegisterAsync, avatar, phone, sign } } = useStoreHook();

  const [files, setFiles] = useState([{ url: avatar }]);

  const { getFieldProps, validateFields } = props.form;

  // 图片上传
  const handleChange = (files) => {
    if (files[0]?.file?.size / 1024 / 1024 > 0.5) {
      Toast.fail('图片大小不能大于0.5M')
      return;
    }
    setFiles(files);
  }

  // 登录按钮事件
  const handleSubmit = () => {
    validateFields((error, value) => {
      if (error) {
        Toast.fail('请将信息填写完整');
        return;
      } else {
        // 密码和确认密码一致确认
        if (value.businesspassword !== value.businesspassword2) {
          Toast.fail('密码和确认密码必须一致');
          return;
        }
        // 通过stores中的registerAsync方法发送http注册请求
        // registerAsync({ value });
        businessRegisterAsync({
          value,
          avatar: files[0].url,
        })
        // console.log('注册成功');
      }
    })
  };

  const handleClick = () => {
    history.push('/businesslogin');
  }

  useEffect(() => {

  }, [])

  return (
    <div className='register-page'>
      <List
        renderHeader={() => '管理员注册'}
      >
        <ImagePicker
          files={files}
          selectable={files.length < 1}
          onChange={handleChange}
        />

        <InputItem
          {...getFieldProps('businessname', {
            rules: [{ required: true }]
          })}
          placeholder='管理员名称'
        >
          名称：
        </InputItem>
        <InputItem
          {...getFieldProps('businesspassword', {
            rules: [{ required: true }]
          })}
          placeholder='管理员密码'
        >
          密码：
        </InputItem>
        <InputItem
          {...getFieldProps('businesspassword2', {
            rules: [{ required: true }]
          })}
          placeholder='确认密码'
        >
          确认密码：
        </InputItem>
        <InputItem
          {...getFieldProps('phone', {
            rules: [{ required: true }],
            initialValue: phone
          })}
          placeholder='电话'
        >
          电话：
        </InputItem>
        <InputItem
          {...getFieldProps('sign', {
            rules: [{ required: true }],
            initialValue: sign
          })}
          placeholder='签名'
        >
          签名：
        </InputItem>
      </List>
      <Button type='warning' onClick={handleSubmit}>注册</Button>
      <div className='login' onClick={handleClick}>已有管理员，去登录</div>
    </div>
  )
}
export default createForm()(register);