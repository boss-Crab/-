import { Toast } from 'antd-mobile'
export default function Http({
  url,
  method = 'post',
  headers = {},
  body = {},
  setLoading,
  setResult,
}) {
  setLoading && setLoading(true);

  // 获取token
  const token = localStorage.getItem('token');

  // 设置请求头
  let defaultHeader = {
    'Content-type': 'application/json'
  };
  // 如果token存在，将其加入请求头中
  defaultHeader = token ? {
    ...defaultHeader,
    token,
  } : defaultHeader;

  let params;
  if (method.toUpperCase() === 'GET') {
    params = undefined;
  } else {
    params = {
      headers: {
        ...defaultHeader,
        ...headers,
      },
      method,
      body: JSON.stringify(body)
    }
    // console.log(params);
  }

  return new Promise((resolve, reject) => {
    // 拼接请求路径
    fetch('/api' + url, params)
      .then(res => res.json())
      .then(res => {
        if (res.status === 200) {
          resolve(res.data);
          setResult && setResult(res.data);
        } else {
          if (res.status === 1001) {
            location.href = '/login?from=' + location.pathname;
            localStorage.clear();
          }
          Toast.fail(res.errMsg);
          reject(res.errMsg);
        }
      })
      .catch(err => {
        Toast.fail(err);
        reject(err);
      })
      .finally(() => {
        setLoading && setLoading(false);
      })
  })
}