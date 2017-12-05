module.exports = class extends think.Controller {
  __before() {
    this.header("Access-Control-Allow-Origin", this.header("origin") || "*");
  }
};
