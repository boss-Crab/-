import React, { useState, useEffect } from 'react';
import { ShowLoading } from '@/components';
import { timer } from '@/utils';
import { nanoid } from 'nanoid';

export default function (props) {
  const [state, setState] = useState()

  useEffect(() => { }, [])

  return (
    <div className='comment'>
      <h1 className='comment-title'>所有用户评价</h1>
      <div className='comment-lists'>
        {props?.lists?.map(item => (
          <div className='comment-lists_item' key={nanoid()}>
            <img alt='user' className='avatar' src={item?.user?.avatar}></img>
            <div className='right'>
              <div className='right-top'>
                <p className='right-top-left'>{item?.user?.username}</p>
                <p className='right-top-right'>{timer(item?.createTime)}</p>
              </div>
              <div className='right-bottom'>
                {item?.msg}
              </div>
            </div>
          </div>
        ))}
        <ShowLoading showLoading={props.showLoading} />
      </div>
    </div>
  )
}