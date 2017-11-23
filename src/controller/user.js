const BaseRest = require('./rest.js');

module.exports = class extends BaseRest {

    async postAction() {
        let username = this.post('username');//获取用户名给username变量
        let password = this.post('password');
        console.log(username);
        let data = await this.model('user').where({username: username, password: password}).find();//到数据库中去查找看是否有数据（用户名密码同时相符）
        if (think.isEmpty(data)) {//这里我直接用isEmpty居然不能用。查了下资料需要用think.isEmpty()
            return this.error(403, '账号密码错误！请重新填写');//登录不成功，返回错误信息。
        } else {
            // this.session('userinfo', data);
            return this.success(data);

        }
        // const postId = this.get('postId');
        // const commentId = this.get('id');
        // const comment = this.model('comment');
        // if(commentId) { // 获取单条评论的详细信息
        //     const data = await comment.where({post_id: postId, id: commentId}).find();
        //     return this.success(data);
        // } else { // 获取单条文章下的评论列表
        //     const list = await comment.where({post_id: postId}).select();
        //     return this.success(list);
        // }
    }
};
