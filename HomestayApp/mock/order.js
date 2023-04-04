export default{
  'post /api/order/lists':(req,res)=>{
    setTimeout(()=>{
      let data;
      if (req.body.pageNum < 4) {
        data = [
          {
            id: 1,
            img: "https://img.zcool.cn/community/01a6ba5d14399ba801215529291194.jpg@1280w_1l_2o_100sh.jpg",
            title: '东城民宿',
            info: '东城区交通方便',
            price: '100'
          },
          {
            id: 2,
            img: "https://img.zcool.cn/community/0125015e217129a80120a895f459c9.jpg@1280w_1l_2o_100sh.jpg",
            title: '西城民宿',
            info: '西城区山水怡情',
            price: '120'
          },
          {
            id: 3,
            img: "https://ts1.cn.mm.bing.net/th/id/R-C.16e64ae4b9fa0311ecb193e19611b260?rik=h4QOL6aOL9fQPQ&riu=http%3a%2f%2fnews.66wz.com%2fpic%2f003%2f005%2f124%2f00300512418_bba8de6d.jpg&ehk=j1ugkHR5qNM4DRAAznBHvoGDRjwXuFQjhBk7q8Izjwg%3d&risl=&pid=ImgRaw&r=0",
            title: '新区民宿',
            info: '新区民宿位置优越',
            price: '200'
          },
          {
            id: 4,
            img: "https://img.zcool.cn/community/01a6ba5d14399ba801215529291194.jpg@1280w_1l_2o_100sh.jpg",
            title: '东城民宿',
            info: '东城区交通方便',
            price: '100'
          },
          {
            id: 5,
            img: "https://img.zcool.cn/community/0125015e217129a80120a895f459c9.jpg@1280w_1l_2o_100sh.jpg",
            title: '西城民宿',
            info: '西城区山水怡情',
            price: '120'
          },
          {
            id: 6,
            img: "https://ts1.cn.mm.bing.net/th/id/R-C.16e64ae4b9fa0311ecb193e19611b260?rik=h4QOL6aOL9fQPQ&riu=http%3a%2f%2fnews.66wz.com%2fpic%2f003%2f005%2f124%2f00300512418_bba8de6d.jpg&ehk=j1ugkHR5qNM4DRAAznBHvoGDRjwXuFQjhBk7q8Izjwg%3d&risl=&pid=ImgRaw&r=0",
            title: '新区民宿',
            info: '新区民宿位置优越',
            price: '200'
          },
          {
            id: 7,
            img: "https://img.zcool.cn/community/01a6ba5d14399ba801215529291194.jpg@1280w_1l_2o_100sh.jpg",
            title: '东城民宿',
            info: '东城区交通方便',
            price: '100'
          },
          {
            id: 8,
            img: "https://img.zcool.cn/community/0125015e217129a80120a895f459c9.jpg@1280w_1l_2o_100sh.jpg",
            title: '西城民宿',
            info: '西城区山水怡情',
            price: '120'
          },
        ]
      } else {
        data = []
      }
      res.json({
        status: 200,
        data
      })
    },100);
  }
}