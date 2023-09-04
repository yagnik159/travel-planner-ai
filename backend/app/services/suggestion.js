class suggestion {
  constructor(req, res) {
    const oThis = this;

    this.req = req;
    this.res = res;
  }

  perform() {
    const oThis = this;
    oThis.res.send("Hello World!");
    return oThis.res;
  }
}

module.exports = suggestion;
