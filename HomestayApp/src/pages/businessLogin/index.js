import React, { useState, useEffect } from 'react';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { history } from 'umi';
import { useStoreHook } from 'think-react-store';

import './index.less'

function BusinessLogin(props) {
  const { business: { businessLoginAsync } } = useStoreHook();

  const { getFieldProps, validateFields } = props.form;

  // 登录按钮事件
  const handleSubmit = () => {
    validateFields((error, value) => {
      if (error) {
        Toast.fail('请将信息填写完整');
        return;
      } else {
        // 商家登录功能
        // loginAsync({ value });
        // console.log('登录了');
        businessLoginAsync({ value });
      }
    })
  };

  const handleClick = () => {
    history.push('/businessRegister');
  }

  return (
    <div className='business-page'>
      <List
        renderHeader={() => '管理员登录'}
      >
        <InputItem
          {...getFieldProps('businessname', {
            rules: [{ required: true }]
          })}
          placeholder='名称'
        >
          管理员名称：
        </InputItem>
        <InputItem
          {...getFieldProps('businesspassword', {
            rules: [{ required: true }]
          })}
          placeholder='密码'
        >
          管理员密码：
        </InputItem>
      </List>
      <Button type='warning' onClick={handleSubmit}>登录</Button>
      <div className='register' onClick={handleClick}>没有此管理员，去注册</div>
    </div>
  )
}
export default createForm()(BusinessLogin);