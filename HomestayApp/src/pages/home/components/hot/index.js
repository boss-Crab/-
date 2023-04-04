import React, { useState, useEffect, memo } from 'react';
import { history } from 'umi';
import { ErrorBoundary } from '@/components';

// home热销民宿组件
function Hot(props) {

  const handleClick = (id) => {
    history.push({
      pathname: '/house',
      query: {
        id
      }
    })
  }

  useEffect(() => {

  }, [])

  return (
    // <ErrorBoundary>
      <div className='hot'>
        <h1>最热名宿</h1>
        <div className='hot-lists'>
          {props?.houses?.map(item => (
            <div className='hot-lists-item' key={item.id} onClick={() => handleClick(item.id)}>
              <img className='img' src={item?.imgs[0]?.url} alt='img' />
              <div className='title'>{item.title}</div>
              <div className='info'>{item.info}</div>
              <div className='price'>￥{item.price}</div>
            </div>
          ))}
        </div>
      </div>
  )
}
// 对Hot组件进行缓存，当属性发生改变时，才重新渲染
export default memo(Hot);