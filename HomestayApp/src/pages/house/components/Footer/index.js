import React, { useState, useEffect } from 'react';
import { Modal } from '@/components';
import { TextareaItem, Button, Toast } from 'antd-mobile';
import { useStoreHook } from 'think-react-store';
import { useLocation } from 'umi';

export default function (props) {
  const [show, setShow] = useState(false);
  const [commentsValue, setCommentsValue] = useState();
  const { house: { addCommentsAsync } } = useStoreHook();
  const { query } = useLocation();

  const handleClick = () => {
    setShow(true)
  }

  const handleChange = (value) => {
    setCommentsValue(value);
  }

  const handleClose = () => {
    setShow(false)
  }

  const handleSubmit = () => {
    if (commentsValue) {
      handleClose();
      addCommentsAsync({
        comment: commentsValue,
        houseId: query?.id,
      })
    } else {
      Toast.fail('请添加信息');
    }
  }

  useEffect(() => {

  }, [])

  return (
    <div>
      <div className='footer' onClick={handleClick}>
        评论~~
      </div>

      <Modal
        show={show}
        styleBody={{
          height: '220px',
          width: '100%',
          bottom: '0px',
          top: 'unset'
        }}
        onClose={handleClose}
      >
        <div className='modal-comment'>
          <TextareaItem
            rows={2}
            count={200}
            onChange={handleChange}
            style={{ width: '280px', height: '90px', fontSize: '15px', border: '1px #8a9094 solid', marginLeft: '-15px' }}
          ></TextareaItem>
          <Button onClick={handleSubmit} className='comment-btn' type='warning'>评论</Button>
        </div>
      </Modal>
    </div>
  )
}