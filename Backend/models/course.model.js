const db = require('../utils/db');
db.on('query', console.log)
module.exports = {
  getAll() {
    return db('course');
  },

  async singleById(id) {
    const list = await db('course').where('id', id);
    if (list.length === 0) {
      return null;
    }

    return list[0];
  },

  add(course) {
    return db('course')
      .returning('id')
      .insert(course);
  },
  async delById(id) {
    await db('course').where('id', id).del();
  },
  async updateById(id, data) {
    const upadteDb = await db('course').where('id', id).update(data);
  },
  async searchByKeyword(keyword){
    return db.select(db.raw(`* FROM course WHERE MATCH(name) AGAINST('${keyword}' IN NATURAL LANGUAGE MODE)`)); 
  },
  async courseRegister(uid, cid){
    // return db.raw(`insert into student_course ('courseID', æstudentID', 'progress') VALUES ('?', '?', 'chua hoan thanh');`,uid,cid);
    return db('student_course').insert({courseID: cid, studentID: uid, progress:"chưa hoàn thành"});
  }
};
