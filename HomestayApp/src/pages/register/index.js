import React, { useState, useEffect } from 'react';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { history } from 'umi';
import { useStoreHook } from 'think-react-store';

import './index.less';

function register(props) {
  // 获取stores中user.js中的异步登录方法
  const { user: { registerAsync } } = useStoreHook();

  const { getFieldProps, validateFields } = props.form;

  // 登录按钮事件
  const handleSubmit = () => {
    validateFields((error, value) => {
      if (error) {
        Toast.fail('请将信息填写完整');
        return;
      } else {
        // 密码和确认密码一致确认
        if (value.password !== value.password2) {
          Toast.fail('密码和确认密码必须一致');
          return;
        }
        // 通过stores中的registerAsync方法发送http注册请求
        registerAsync({ value })
      }
    })
  };

  const handleClick = () => {
    history.push('/login');
  }

  useEffect(() => {

  }, [])

  return (
    <div className='register-page'>
      <List
        renderHeader={() => '用户注册'}
      >
        <InputItem
          {...getFieldProps('username', {
            rules: [{ required: true }]
          })}
          placeholder='用户名'
        >
          用户名：
        </InputItem>
        <InputItem
          {...getFieldProps('password', {
            rules: [{ required: true }]
          })}
          placeholder='密码'
        >
          密码：
        </InputItem>
        <InputItem
          {...getFieldProps('password2', {
            rules: [{ required: true }]
          })}
          placeholder='确认密码'
        >
          确认密码：
        </InputItem>
      </List>
      <Button type='warning' onClick={handleSubmit}>注册</Button>
      <div className='login' onClick={handleClick}>已有用户，去登录</div>
    </div>
  )
}
export default createForm()(register);