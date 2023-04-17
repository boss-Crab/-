import React, { useState, useEffect } from 'react';
import { List, ImagePicker, Toast, InputItem, Button } from 'antd-mobile'
import { createForm } from 'rc-form';
import { useStoreHook } from 'think-react-store';

function Edit(props) {
  const { getFieldProps, validateFields } = props.form;
  // 获取stores中的editUserAsync方法
  const { business: { editBusinessAsync, getBusinessAsync, businessname, avatar, phone, sign } } = useStoreHook();
  const [files, setFiles] = useState([{ url: avatar }]);

  // 图片上传
  const handleChange = (files) => {
    if (files[0]?.file?.size / 1024 / 1024 > 0.5) {
      Toast.fail('图片大小不能大于0.5M')
      return;
    }
    setFiles(files);
  }

  // 提交用户照片、电话、签名事件
  const handleSubmit = () => {
    if (!files.length) {
      Toast.fail('请上传图片');
      return;
    }
    validateFields((error, value) => {
      if (error) {
        Toast.fail('请将信息补充完整');
        return;
      } else {
        editBusinessAsync({
          businessname: localStorage.getItem('businessname'),
          businessid: localStorage.getItem('businessid'),
          avatar: files[0].url,
          phone: value.businessPhone,
          sign: value.businessSign,
        });
      }
    });
  }

  useEffect(() => {
    // console.log(props);
    // getBusinessAsync({
    //   businessname: localStorage.getItem('businessname'),
    // });
  }, [])

  return (
    <div className='user-edit'>
      <List>
        <ImagePicker
          files={files}
          selectable={files.length < 1}
          onChange={handleChange}
        />
        <InputItem
          {...getFieldProps('businessPhone', {
            rules: [{ required: true }],
            initialValue: phone
          })}
          placeholder='商家电话'
        >
          商家电话：
        </InputItem>
        <InputItem
          {...getFieldProps('businessSign', {
            rules: [{ required: true }],
            initialValue: sign
          })}
          placeholder='商家签名'
        >
          商家签名：
        </InputItem>
      </List>
      <Button type='warning' style={{ marginTop: '20px' }} onClick={handleSubmit}>修改</Button>
    </div>
  )
}

export default createForm()(Edit);