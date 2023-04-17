import React, { useState, useEffect } from 'react';
import AwesomeSwiper from 'react-awesome-swiper';
import { nanoid } from 'nanoid';

export default function (props) {

  return (
    <div>
      <div className='swiper-wrapper'>
        {props?.banner?.map(item => (
          <div className='swiper-slide' key={nanoid()}>
            <img alt='banner' src={item?.url}></img>
          </div>
        ))}
      </div>
      <div className='swiper-pagination'></div>
    </div>
  )
}