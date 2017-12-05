const BaseRest = require('./rest.js');

module.exports = class extends BaseRest {

    
    async postAction() {
        this.header("Access-Control-Allow-Origin", this.header("origin") || "*");
        this.header("Access-Control-Allow-Headers", "x-requested-with");
        this.header("Access-Control-Request-Method", "GET,POST,PUT,DELETE");
        this.header("Access-Control-Allow-Credentials", "true");
        let username = this.post('username');//获取用户名给username变量
        let password = this.post('password');
        console.log(username);
        let data = await this.model('user').where({username: username, password: password}).find();//到数据库中去查找看是否有数据（用户名密码同时相符）
        if (think.isEmpty(data)) {//这里我直接用isEmpty居然不能用。查了下资料需要用think.isEmpty()
            return this.fail('账号密码错误！请重新填写');//登录不成功，返回错误信息。
        } else {
            // this.session('userinfo', data);
            return this.success(data);
        }

    }
};
