module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;

  const Business = app.model.define('business', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    businessname: STRING(20),
    businesspassword: STRING(64),
    avatar: TEXT('long'),
    phone: STRING(20),
    sign: STRING(300),
    createTime: DATE,
    updateTime: DATE,
  });
  return Business;
};
