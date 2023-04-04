export default {
  'post /api/user/detail': (req, res) => {
    res.json({
      status: 200,
      data: {
        id: 10,
        username: '测试用户',
        avatar: 'https://img.zcool.cn/community/01a6ba5d14399ba801215529291194.jpg@1280w_1l_2o_100sh.jpg',
        tel: 12354678901,
        sign: '花桥流水'
      }
    })
  },
  'post /api/user/edit': (req, res) => {
    res.json({
      status: 200,
      data: 'ok'
    })
  },
  'post /api/user/login': (req, res) => {
    res.json({
      status: 200,
      data: {
        id:100,
        username:'admin'
      }
    })
  },
  'post /api/user/register': (req, res) => {
    res.json({
      status: 200,
      data: {
        id:100,
        username:'admin'
      }
    })
  },
}