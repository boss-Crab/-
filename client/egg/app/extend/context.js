module.exports = {
  params(key) {
    const method = this.request.method;
    if (method === 'GET') {
      return key ? this.query[key] : this.query;
    }
    return key ? this.request.body[key] : this.request.body;
  },

  get username() {
    const token = this.request.header.token;
    const tokenCache = token ? this.app.jwt.verify(token, this.app.config.jwt.secret) : undefined;

    return tokenCache ? tokenCache.username : undefined;
  },

  get userId() {
    const token = this.request.header.token;
    const tokenCache = token ? this.app.jwt.verify(token, this.app.config.jwt.secret) : undefined;

    return tokenCache ? tokenCache.id : undefined;
  },

  get businessname() {
    console.log(this.request.header);
    const businessToken = this.request.header.token;
    const tokenCache = businessToken ? this.app.jwt.verify(businessToken, this.app.config.jwt.secret) : undefined;

    return tokenCache ? tokenCache.businessname : undefined;
  },

  get businessId() {
    const businessToken = this.request.header.businessToken;
    const tokenCache = businessToken ? this.app.jwt.verify(businessToken, this.app.config.jwt.secret) : undefined;

    return tokenCache ? tokenCache.businessId : undefined;
  },
};
