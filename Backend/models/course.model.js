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
  async hot(){
    return db.select(db.raw(`COUNT((courseID)) as count, courseID
    FROM student_course
    WHERE WEEK(CURDATE()) = WEEK(student_course.registerDate)
    GROUP BY courseID ORDER BY count DESC LIMIT 4`));
  },
  async trending(){
    return db.select(db.raw(`id, views from course 
    ORDER BY views DESC LIMIT 10`)); 
  },
  async new(){
    return db.select(db.raw(`id, createdDate from course 
    ORDER BY createdDate DESC LIMIT 10`)); 
  }
};
// select categoryID, count(categoryID) as count
// FROM student_course INNER JOIN course on courseID = id
// WHERE WEEK(CURDATE()) = WEEK(student_course.registerDate)
// GROUP by categoryID ORDER by count DESC LIMIT 10