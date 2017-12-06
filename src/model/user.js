module.exports = class extends think.Model {

  checkPassword(username, password) {
      return this.model('user').where({username: username, password: password}).find()
  }

  addUser(data) {
    const date = think.datetime();
    //const encryptPassword = this.getEncryptPassword(data.password);
    return this.where({
      username: data.username,
      // email: data.email,
      _logic: 'OR'
    }).thenAdd({
      username: data.username,
      // email: data.email,
      nickname: "dajiahao",
      password: data.password,
      registertime: date,
      sex:1
    });
  }

  updateUser(data) {
    if (data.password) {
      data.password = this.getEncryptPassword(data.password);
    }

    return this.where({[this.pk]: data.id}).update(data);
  }
};
