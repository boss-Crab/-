CREATE DATABASE egg_house;

use egg_house;

--- 用户表
CREATE Table `user`(
  `id` INT NOT NULL auto_increment,
  `username` VARCHAR(20) DEFAULT NULL COMMENT '用户名',
  `password` VARCHAR(64) DEFAULT NULL COMMENT '密码',
  `avatar` TEXT COMMENT '头像',
  `phone` VARCHAR(20) DEFAULT NULL COMMENT '电话',
  `sign` VARCHAR(300) DEFAULT NULL COMMENT '用户签名',
  `createTime` TIMESTAMP DEFAULT NULL COMMENT '创建时间',
  `updateTime` TIMESTAMP DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY(`id`)
)engine=InnoDB auto_increment=1 DEFAULT charset=utf8 COMMENT='用户表';

---民宿表
CREATE Table `house`(
  `id` INT NOT NULL auto_increment,
  `name` VARCHAR(50) DEFAULT NULL COMMENT '房屋名称',
  `info` VARCHAR(150) DEFAULT NULL COMMENT '房屋简介',
  `addres` VARCHAR(200) DEFAULT NULL COMMENT '房屋地址',
  `price` INT DEFAULT NULL COMMENT '房屋价格',
  `publishTime` TIMESTAMP DEFAULT NULL COMMENT '发布时间',
  `cityCode` VARCHAR(200) NOT NULL COMMENT '城市编码',
  `showCount` INT(5) NOT NULL DEFAULT 0 COMMENT '展示次数',
  `startTime` TIMESTAMP DEFAULT NULL COMMENT '开始出租时间',
  `endTime` TIMESTAMP DEFAULT NULL COMMENT '出租结束时间',
  PRIMARY KEY(`id`)
)engine=InnoDB auto_increment=1 DEFAULT charset=utf8 COMMENT='民宿表';

---图片表
CREATE Table `imgs`(
  `id` INT NOT NULL auto_increment,
  `url` VARCHAR(500) DEFAULT NULL COMMENT '图片地址',
  `houseId` INT NOT NULL COMMENT '房屋id',
  `createTime` TIMESTAMP DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY(`id`)
)engine=InnoDB auto_increment=1 DEFAULT charset=utf8 COMMENT='图片表';

---评论表
CREATE TABLE `comment`(
  `id` INT NOT NULL auto_increment,
  `userId` INT NOT NULL COMMENT '用户表id',
  `houseId` INT NOT NULL COMMENT '房屋表id',
  `msg` VARCHAR(500) DEFAULT null COMMENT '评论内容',
  `createTime` TIMESTAMP DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY(`id`)
)engine=InnoDB auto_increment=1 DEFAULT charset=utf8 COMMENT='评论表';

-- 插入房屋信息
INSERT  INTO `house` VALUES
(1, '东城民宿', '东区 临近地铁', '东城区', 200, '2022-08-20 13:37:57', '10001',1, '2022-08-20 13:37:57', '2023-03-20 13:37:57'),
(2, '西城民宿', '西区 临近地铁', '西城区', 100, '2022-08-20 13:37:57', '10001', 1,'2022-08-20 13:37:57', '2023-03-20 13:37:57'),
(3, '新区民宿', '新区 地理位置优越', '新城区', 250, '2022-08-20 13:37:57', 1,'10001', '2022-08-20 13:37:57', '2023-03-20 13:37:57'),
(4, '老城民宿', '老城 风景秀美', '老城区', 150, '2022-08-20 13:37:57', '10001', 0,'2022-08-20 13:37:57', '2023-03-20 13:37:57'),
(5, '西苑民宿', '西苑 适合放松身心', '东城区', 200, '2022-08-20 13:37:57', '10001',0, '2022-08-20 13:37:57', '2023-03-20 13:37:57'),
(6, '江南民宿', '江南 交通便捷', '西城区', 200, '2022-08-20 13:37:57', '10001', 0,'2022-08-20 13:37:57', '2023-03-20 13:37:57'),
(7, '东城区民宿', '东城区 风景秀丽', '新城区', 150, '2022-08-20 13:37:57', '10002', 0,'2022-08-20 13:37:57', '2023-03-20 13:37:57'),
(8, '莞城民宿', '莞城 交通方便', '老城区', 250, '2022-08-20 13:37:57', '10001', 0,'2022-08-20 13:37:57', '2023-03-20 13:37:57'),
(9, '北苑民宿', '北苑 风景秀丽', '东城区', 100, '2022-08-20 13:37:57', '10002', 0,'2022-08-20 13:37:57', '2023-03-20 13:37:57'),
(10, '东苑民宿', '东苑 交通便捷', '西城区', 100, '2022-08-20 13:37:57', '10003', 0,'2022-08-20 13:37:57', '2023-03-20 13:37:57'),
(11, '老城区民宿', '老城区 出行方便', '新城区', 150, '2022-08-20 13:37:57', '10001', 0,'2022-08-20 13:37:57', '2023-03-20 13:37:57'),
(12, '新区民宿', '新区 风景秀丽', '东城区', 200, '2022-08-20 13:37:57', '10001', 0,'2022-08-20 13:37:57', '2023-03-20 13:37:57'),
(13, '南城民宿', '南城 风景优美', '西城区', 200, '2022-08-20 13:37:57', '10001', 0,'2022-08-20 13:37:57', '2023-03-20 13:37:57'),
(14, '北区民宿', '北区 位置优越', '新城区', 250, '2022-08-20 13:37:57', '10001', 0,'2022-08-20 13:37:57', '2023-03-20 13:37:57'),
(15, '南区民宿', '南区 出行便捷', '新城区', 200, '2022-08-20 13:37:57', '10001', 0,'2022-08-20 13:37:57', '2023-03-20 13:37:57');

-- 插入图片
INSERT INTO `imgs` VALUES
(1,'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fef3289a3-1ec6-4c3b-a03d-b772a33cfd69%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1682919811&t=c697a11ceaae729f05dd47a3a9f90368',1,'2022-08-20 13:37:57'),
(2,'https://img.zcool.cn/community/01a6ba5d14399ba801215529291194.jpg@1280w_1l_2o_100sh.jpg',1,'2022-08-20 13:37:57'),
(3,'https://img.zcool.cn/community/0125015e217129a80120a895f459c9.jpg@1280w_1l_2o_100sh.jpg',1,'2022-08-20 13:37:57'),
(4,'https://ts1.cn.mm.bing.net/th/id/R-C.16e64ae4b9fa0311ecb193e19611b260?rik=h4QOL6aOL9fQPQ&riu=http%3a%2f%2fnews.66wz.com%2fpic%2f003%2f005%2f124%2f00300512418_bba8de6d.jpg&ehk=j1ugkHR5qNM4DRAAznBHvoGDRjwXuFQjhBk7q8Izjwg%3d&risl=&pid=ImgRaw&r=0',1,'2022-08-20 13:37:57'),
(5,'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F290ee419-8dca-4598-9e2d-1b4649b31db6%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1682920044&t=1fd8c3f87d5726c68e03ab8e02ba6d9c',1,'2022-08-20 13:37:57'),
(6,'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F0a18e3b9-d23f-48cb-ad02-e3e1d626b101%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1682920044&t=ea964ee8654751f3f10874f2a9848ebd',1,'2022-08-20 13:37:57'),
(7,'https://ts1.cn.mm.bing.net/th/id/R-C.16e64ae4b9fa0311ecb193e19611b260?rik=h4QOL6aOL9fQPQ&riu=http%3a%2f%2fnews.66wz.com%2fpic%2f003%2f005%2f124%2f00300512418_bba8de6d.jpg&ehk=j1ugkHR5qNM4DRAAznBHvoGDRjwXuFQjhBk7q8Izjwg%3d&risl=&pid=ImgRaw&r=0',1,'2022-08-20 13:37:57'),
(8,'https://img.zcool.cn/community/01a6ba5d14399ba801215529291194.jpg@1280w_1l_2o_100sh.jpg',1,'2022-08-20 13:37:57'),
(9,'https://p8.itc.cn/images01/20210408/9735e2b986084dfc9b9360fd18af45bd.jpeg',1,'2022-08-20 13:37:57'),
(11,'https://ts1.cn.mm.bing.net/th/id/R-C.16e64ae4b9fa0311ecb193e19611b260?rik=h4QOL6aOL9fQPQ&riu=http%3a%2f%2fnews.66wz.com%2fpic%2f003%2f005%2f124%2f00300512418_bba8de6d.jpg&ehk=j1ugkHR5qNM4DRAAznBHvoGDRjwXuFQjhBk7q8Izjwg%3d&risl=&pid=ImgRaw&r=0',1,'2022-08-20 13:37:57'),
(12,'https://p2.itc.cn/q_70/images03/20210721/af697913a4324d83808ae5d1733dd630.jpeg',1,'2022-08-20 13:37:57'),
(13,'https://p8.itc.cn/q_70/images01/20211125/10b02a2f4a5a41a187eaed4fdc2999ff.jpeg',1,'2022-08-20 13:37:57'),
(14,'https://img.zcool.cn/community/01a6ba5d14399ba801215529291194.jpg@1280w_1l_2o_100sh.jpg',1,'2022-08-20 13:37:57'),
(15,'https://img0.baidu.com/it/u=646771489,1739080191&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500',1,'2022-08-20 13:37:57'),
(16,'https://ts1.cn.mm.bing.net/th/id/R-C.16e64ae4b9fa0311ecb193e19611b260?rik=h4QOL6aOL9fQPQ&riu=http%3a%2f%2fnews.66wz.com%2fpic%2f003%2f005%2f124%2f00300512418_bba8de6d.jpg&ehk=j1ugkHR5qNM4DRAAznBHvoGDRjwXuFQjhBk7q8Izjwg%3d&risl=&pid=ImgRaw&r=0',1,'2022-08-20 13:37:57'),
(17,'https://imagepphcloud.thepaper.cn/pph/image/145/779/939.jpg',1,'2022-08-20 13:37:57'),
(18,'https://img.zcool.cn/community/01a6ba5d14399ba801215529291194.jpg@1280w_1l_2o_100sh.jpg',1,'2022-08-20 13:37:57');


-- 订单表
CREATE Table `orders`(
  `id` INT NOT NULL auto_increment,
  `orderNumber` VARCHAR(20) DEFAULT NULL COMMENT '订单编号',
  `userId` INT NOT NULL COMMENT '用户id',
  `houseId` INT NOT NULL COMMENT '房屋id',
  `isPayed` INT(2) DEFAULT 0 COMMENT '是否支付, 0未支付, 1已支付',
  `createTime` TIMESTAMP DEFAULT NULL COMMENT '创建时间',
  `updateTime` TIMESTAMP DEFAULT NULL COMMENT '更新时间',
  `finished` INT(2) DEFAULT 0 COMMENT '是否完成订单, 0未支付, 1已支付',
  `startTime` TIMESTAMP DEFAULT NULL COMMENT '出租开始时间',
  `endTime` TIMESTAMP DEFAULT NULL COMMENT '出租结束时间',
  PRIMARY KEY(`id`)
)engine=InnoDB auto_increment=1 DEFAULT charset=utf8 COMMENT='订单表';


-- 商家表
CREATE Table `business`(
  `id` INT NOT NULL auto_increment,
  `businessname` VARCHAR(20) DEFAULT NULL COMMENT '用户名',
  `businesspassword` VARCHAR(64) DEFAULT NULL COMMENT '密码',
  `avatar` TEXT COMMENT '头像',
  `phone` VARCHAR(20) DEFAULT NULL COMMENT '电话',
  `sign` VARCHAR(300) DEFAULT NULL COMMENT '用户签名',
  `createTime` TIMESTAMP DEFAULT NULL COMMENT '创建时间',
  `updateTime` TIMESTAMP DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY(`id`)
)engine=InnoDB auto_increment=1 DEFAULT charset=utf8 COMMENT='商家表';