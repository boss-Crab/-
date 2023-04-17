import React, { useState, useEffect } from 'react';
import { List, Button } from 'antd-mobile';
import { history, Link } from 'umi';
import { useStoreHook } from 'think-react-store';
import { ErrorBoundary } from '@/components';

import './index.less';

export default function (props) {
  const [state, setState] = useState()
  const [businessname, setBusinessname] = useState(localStorage.getItem('businessname'));
  const { business: { sign, businessLogoutAsync } } = useStoreHook();

  const avatar = localStorage.getItem('businessavatar') ? localStorage.getItem('businessavatar') : null;
  const phone = localStorage.getItem('phone') ? localStorage.getItem('phone') : null;


  // 退出商家登录
  const handleLogout = () => {
    businessLogoutAsync();
  }

  // 管理员查看所有订单
  const handleClickToOrder = () => {
    history.push('/businessorder');
  }
  // 管理员操作订单
  const handleClickOperate = () => {
    history.push('/businessoperate');
  }

  const handleClickHouse = () => {
    history.push('/allhouse');
  }

  return (
    <div>
      <ErrorBoundary>
        <div className='user-page'>
          {/* 用户信息 */}
          <div className='info'>
            {businessname
              ? <div>欢迎您：{businessname}</div>
              : <div><Link to='/businesslogin' style={{ 'color': '#fff' }}>登录</Link></div>
            }
            {/* | <Link to='/businessregister' style={{ 'color': '#fff' }}>注册</Link> */}
            <div className='user'>
              <img alt='user' src={ avatar || require('../../assets/business.jpg')}></img>
              <div className='businesssign'>{phone}</div>
              <div className='tel'>{businessname}</div>
            </div>
          </div>

          {/* 列表 */}
          <div className='lists'>
            <List>
              <List.Item arrow='horizontal' onClick={handleClickToOrder}>
                所有订单
              </List.Item>

              <List.Item arrow='horizontal' onClick={handleClickOperate}>
                订单操作
              </List.Item>

              <List.Item arrow='horizontal' onClick={handleClickHouse}>
                民宿信息
              </List.Item>

            </List>
          </div>
          <Button style={{ marginTop: '100px' }} onClick={handleLogout}>退出登录</Button>
        </div>
      </ErrorBoundary>
    </div>
  )
}