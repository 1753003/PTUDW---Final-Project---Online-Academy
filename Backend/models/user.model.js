const db = require('../utils/db');

module.exports = {
  async singleById(id) {
    const list = await db('user').where('id', id);
    if (list.length === 0) {
      return null;
    }

    return list[0];
  },
  async singleByMail(mail) {
    console.log(mail);
    const list = await db('user').where('email', mail);
    console.log(list);
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
  async addFavorite(uid, cid){
    return db('favoriteCourse').insert({studentId:uid,courseId:cid});
  },
  async delFavorite(uid,cid){
    await db('favoriteCourse').where({
      studentId: uid,
      courseId:  cid
    }).del();
  },
  async getFavorite(uid){
    return db('favoriteCourse').where('studentId' ,uid);
  },
  async courseRegister(uid, cid, data){
    // return db.raw(`insert into student_course ('courseID', æstudentID', 'progress') VALUES ('?', '?', 'chua hoan thanh');`,uid,cid);
    console.log(uid+" "+cid);
    console.log(data);
    return await db.raw("INSERT INTO `jok7rrqgjka2fkpa`.`student_course` (`courseID`, `studentID`, `progress`,`sylabus`) VALUES (?, ?, 'chưa hoàn thành', ?)",[cid,uid,JSON.stringify(data)]);
  },
  async getRegisterCourse(uid){
    return db('student_course').where('studentID' ,uid);
    
  },
  async getRegisterCourseDetail(uid, cid){
    return db('student_course').where({'studentID' :uid,'courseID':cid});
  },
  async editRegisterCourse(uid,cid,data){
    const key = Object.keys(data);
    return db('student_course').where({'studentID' :uid,'courseID':cid}).update(key[0],JSON.stringify(data[key[0]]));
  },
  async edit(uid, data){
    return db('user').where('id' ,uid).update(data);
  },
  async getAllByType(type){
    const list = await db('user').where('type', type);
    if (list.length === 0) {
      return null;
    }
    return list;
  },
  async delUser(uid){
    await db('user').where('id', uid).del();
  },
  async getLectureCourse(uid){
    return db.raw(`select * from course left join user on user.id = course.lecturerID WHERE lecturerID = ${uid}`);
  },

  async getEmail (uid) {
    return await db('user').select('email').where('id',uid);  
  }
};
