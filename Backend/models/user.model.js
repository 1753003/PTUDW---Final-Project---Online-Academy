const db = require('../utils/db');

module.exports = {
  async singleById(id) {
    const list = await db('users').where('id', id);
    if (list.length === 0) {
      return null;
    }

    return list[0];
  },

  async singleByUserName(userName) {
    const list = await db('user').where('username', userName);
    if (list.length === 0) {
      return null;
    }

    return list[0];
  },

  updateRefreshToken(id, refreshToken) {
    return db('user').where('id', id).update('token', refreshToken);
  },

  async isRefreshTokenExisted(id, refreshToken) {
    const list = await db('user')
      .where('id', id)
      .andWhere('token', refreshToken);

    if (list.length > 0)
      return true;

    return false;
  },

  async add(user) {
    const idList = await db('user')
      .returning('id')
      .insert(user);

    return idList[0];
  },
  review(cid, uid, data){
    return db('student_course').where({studentID: 3, courseID:5}).update(data);
  },
  async favorite(uid, cid){
    return db('favoriteCourse').insert({studentId:3,courseId:5});
  }
};
