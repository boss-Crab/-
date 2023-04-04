// 首页页面
import React, { useState, useEffect } from 'react';
import Header from './components/header';
import Hot from './components/hot';
import Search from './components/search';
// 导入useHttpHook
import { useHttpHook } from '@/hooks';
import { ErrorBoundary } from '@/components';


// 引入less样式文件
import './index.less';

export default function (props) {
  const [state, setState] = useState();

  // 发送请求并接受城市数组
  const [citys, citysLoading] = useHttpHook({
    url: '/commons/citys'
  });
  // 发送请求并接受热门民宿数组
  const [houses] = useHttpHook({
    url: '/house/hot'
  });

  useEffect(() => {

  }, [])

  return (
    <ErrorBoundary>
      <div className='home'>
        {/* header登录 */}
        <Header></Header>

        {/* 搜索 */}
        {citys && <Search citys={citys} citysLoading={citysLoading}></Search>}

        {/* 热门民宿 */}
        {houses && <Hot houses={houses} />}
      </div>
    </ErrorBoundary>
  )
}