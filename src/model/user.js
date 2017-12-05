module.exports = class extends think.Model {

  checkPassword(username, password) {
      return this.model('user').where({username: username, password: password}).find()
  }

  addUser(data, ip) {
    const date = think.datetime();
    const encryptPassword = this.getEncryptPassword(data.password);
    return this.where({
      name: data.name,
      email: data.email,
      _logic: 'OR'
    }).thenAdd({
      name: data.name,
      email: data.email,
      display_name: data.display_name,
      password: encryptPassword,
      create_time: date,
      last_login_time: date,
      create_ip: ip,
      last_login_ip: ip,
      status: data.status
    });
  }

  updateUser(data) {
    if (data.password) {
      data.password = this.getEncryptPassword(data.password);
    }

    return this.where({[this.pk]: data.id}).update(data);
  }
};
