const db = require('../utils/db');
db.on('query', console.log)
module.exports = {
  getAll() {
    return db('course');
  },

  async singleById(id) {
    const list = await db('course').leftOuterJoin('user', 'user.id', 'course.lecturerID').where('course.id', id);
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
  async searchByKeyword(keyword) {
    return db.raw(`(SELECT c.id as 'courseID', c.name as 'courseName',a.id as 'categoryID', c.name as 'categoryName',c.id as 'topicID', c.name as 'topicName', URL, price,rating, salePrice, numRate, u.username, briefDescription, detailDescription, saleInformation, views
      FROM course c
      LEFT JOIN category a ON c.categoryID = a.id
      LEFT JOIN category b ON a.idTopic = b.id
      LEFT JOIN user u ON lecturerID = u.id
      WHERE 
      MATCH(c.name) AGAINST('${keyword}*' IN BOOLEAN MODE) or
      MATCH(a.name) AGAINST('${keyword}*' IN BOOLEAN MODE) OR
      MATCH(b.name) AGAINST('${keyword}*' IN BOOLEAN MODE)
      )
      union 
      (SELECT c.id as 'courseID', c.name as 'courseName',a.id as 'categoryID', c.name as 'categoryName',c.id as 'topicID', c.name as 'topicName', URL, price,rating, salePrice, numRate, u.username, briefDescription, detailDescription, saleInformation, views
      FROM course c
      LEFT JOIN category a ON c.categoryID = a.id
      LEFT JOIN category b ON a.idTopic = b.id
      LEFT JOIN user u ON lecturerID = u.id
      where c.name like '${keyword}%' or a.name like '${keyword}%' or b.name like '${keyword}%')`);
  },
  async hot() {
    return db.select(db.raw(`COUNT((courseID)) as count, courseID
    FROM student_course
    WHERE WEEK(CURDATE()) = WEEK(student_course.registerDate)
    GROUP BY courseID ORDER BY count DESC LIMIT 4`));
  },
  async trending() {
    return db.select(db.raw(`id, views from course 
    ORDER BY views DESC LIMIT 10`));
  },
  async new() {
    return db.select(db.raw(`id, createdDate from course 
    ORDER BY createdDate DESC LIMIT 10`));
  },
  async sylabus(id) {
    return db.select(db.raw(`* from sylabus LEFT join course on sylabus.courseID = course.id WHERE id = ${id}`));
  },
  async review(id) {
    return db.select(db.raw(`* from course LEFT join student_course on student_course.courseID = course.id WHERE course.id = ${id}`));
  },
  async relate(id) {
    return db.select(db.raw(`course.id as "courseID", category.id as "categoryID", course.name as "courseName", category.name as "categoryName",COUNT(student_course.courseID) as "register"
    from course 
    left join student_course on course.id = student_course.courseID
    left join category on category.id = course.categoryID 
    WHERE category.id = (
    SELECT categoryID from course where course.id = ${id})
    GROUP by courseName
    ORDER by register DESC
    limit 5`));
  },
  addSylabus(id, data){
    const sylabus = {
      courseID: id,
      week: data.week,
      name: data.name,
      videoLink: data.videoLink
    }
    return db('sylabus').insert(sylabus);
  },
  async updateSylabusById(id, data) {
    const upadteDb = await db('sylabus').where('courseId', id).update(data);
  },

  async getAllInfo() {
    return await db.raw(`select course.*, category.name as categoryName, user.name as lecturerName 
    from course, category, user
    where category.id = course.categoryID and user.id = course.lecturerID`);
  }
};
// select categoryID, count(categoryID) as count
// FROM student_course INNER JOIN course on courseID = id
// WHERE WEEK(CURDATE()) = WEEK(student_course.registerDate)
// GROUP by categoryID ORDER by count DESC LIMIT 10