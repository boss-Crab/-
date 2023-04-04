import React, { useState, useEffect, memo } from 'react';
import { Link } from 'umi';
import { cookie } from 'project-libs';

// home登录组件
function Header(props) {
  const [username, setUsername] = useState(localStorage.getItem('username'));

  useEffect(() => {

  }, [])

  return (
    <div className='header'>
      <div className='header-title'>民宿</div>
      <div className='header-login'>
        {username
          ? <>欢迎您：{username}</>
          : <div><Link to='/login'>登录</Link> | <Link to='register'>注册</Link></div>
        }
      </div>
    </div>
  )
}
// 对Header组件进行缓存，当属性发生改变时，才重新渲染
export default memo(Header);