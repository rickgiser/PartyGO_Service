const BaseRest = require('./rest.js');

module.exports = class extends BaseRest {

    async getAction() {

    }

    async postAction() {
        this.header("Access-Control-Allow-Origin", "*");
        this.header("Access-Control-Allow-Headers", "x-requested-with");
        this.header("Access-Control-Request-Method", "GET,POST,PUT,DELETE");
        this.header("Access-Control-Allow-Credentials", "true");

        switch (this.post('type')) {

            // 登录接口
            case 'login':
                let username = this.post('username');//获取用户名给username变量
                let password = this.post('password');
                console.log(username);

                let data = await this.modelInstance.checkPassword(username, password);//到数据库中去查找看是否有数据（用户名密码同时相符）
                if (think.isEmpty(data)) {//这里我直接用isEmpty居然不能用。查了下资料需要用think.isEmpty()
                    return this.fail('账号密码错误！请重新填写');//登录不成功，返回错误信息。
                } else {
                    // this.session('userinfo', data);
                    return this.success(data);
                }
                break;


            // 注册接口
            case 'register':
                let username2 = this.post('username');//获取用户名给username变量
                let password2 = this.post('password');
                let data2;
                data2 = await this.modelInstance.addUser({username: username2, password: password2});
                var info = await this.modelInstance.checkPassword(username2, password2);
                if (think.isEmpty(data2)) {
                    return this.fail('注册失败~');
                } else if (data2.type === 'exist') {
                    return this.fail('用户名重名');
                } else {
                    return this.success(info);
                }
                break;

            // 其他返回404
            default :
                return this.fail('404');
        }

    }
};
