/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1677849753822_294';

  // add your middleware config here
  config.middleware = [ 'httpLog' ];

  config.httpLog = {
    type: 'all',
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.view = {
    mapping: {
      '.html': 'ejs',
    },
    // 配置读取html文件路径，默认为view文件夹
    // root: path.join(appInfo.baseDir, 'app/html'),
    root: [
      path.join(appInfo.baseDir, 'app/html'),
      path.join(appInfo.baseDir, 'app/view'),
    ].join(','),
  };

  config.ejs = {
    delimiter: '%',
  };

  config.static = {
    prefix: '/public/',
    dir: path.join(appInfo.baseDir, 'app/public'),
  };

  config.session = {
    key: 'XJY_SESS',
    htpOnly: true,
    maxAge: 1000 * 50,
    renew: true,
  };

  config.auth = {
    exclude: [ '/api/user/login', '/api/user/register' ],
  };

  config.mysql = {
    app: true,
    agent: false,
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: '123456',
      database: 'egg_house',
    },
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'egg_house',
    define: {
      timestamps: false,
      freezeTableName: true,
    },
  };

  config.jwt = {
    secret: 'house',
  };

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '123456',
      db: 0,
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    salt: 'house',
    redisExpire: 60 * 60 * 24,
  };

  return {
    ...config,
    ...userConfig,
  };
};
