const db = require('../utils/db');

// db.on('query', console.log)
module.exports = {
  async getAll() {
    return await db.raw(`select course.*, category.name as categoryName
    from course, category
    where category.id = course.categoryID and course.disabled = 1 `);
  },

  async singleById(id) {
    return await db.raw(`select course.*, category.name as categoryName, user.name as lecturerName 
    from course, category, user
    where category.id = course.categoryID and user.id = course.lecturerID and course.id = ${id}`);
  },

  add(course) {
    return db('course')
      .returning('id')
      .insert(course);
  },
  async delById(id) {

    await db('course').where('id', id).del();
  },
  async disabled(id, data) {
    return await db('course').where('id', id).update(data);
  },
  async updateById(id, data) {
    const form = {
      name: data.name,
      price: data.price,
      salePrice: data.salePrice,
      briefDescription: data.briefDescription,
      detailDescription: data.detailDescription,
      saleInformation: data.saleInformation,
      status: data.status
    }
    if ( data.views ) {
      form.views = data.views;
    }

    console.log(data);
    return await db('course').where('id', id).update(form);
  },
  async searchByKeyword(keyword) {
    return await db.raw(`(SELECT c.createdDate, c.id as 'courseID', c.name as 'courseName',a.id as 'categoryID', c.name as 'categoryName',c.id as 'topicID', c.name as 'topicName', URL, price,rating, salePrice, numRate, u.username, briefDescription, detailDescription, saleInformation, views,  status, disabled
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
      (SELECT c.createdDate, c.id as 'courseID', c.name as 'courseName',a.id as 'categoryID', c.name as 'categoryName',c.id as 'topicID', c.name as 'topicName', URL, price,rating, salePrice, numRate, u.username, briefDescription, detailDescription, saleInformation, views, status, disabled
      FROM course c
      LEFT JOIN category a ON c.categoryID = a.id
      LEFT JOIN category b ON a.idTopic = b.id
      LEFT JOIN user u ON lecturerID = u.id
      where c.name like '${keyword}%' or a.name like '${keyword}%' or b.name like '${keyword}%')`);
  },
  async hot() {
    return await db.select(db.raw(`COUNT((courseID)) as count, 
    courseID, URL, course.name, rating, numRate, disabled, category.name as categoryName, price, salePrice, course.createdDate,
    briefDescription, status, user.name as lecturerName
    FROM student_course 
    left join course on courseID = course.id
    left join category on categoryID = category.id
    left join user on lecturerID = user.id
    WHERE WEEK(CURDATE()) = WEEK(student_course.registerDate)
    GROUP BY courseID ORDER BY count DESC LIMIT 4`));
  },
  async trending() {
    return await db.select(db.raw(`
    course.id as courseID, URL, course.name, rating, numRate, category.name as categoryName, price, salePrice,course.createdDate,
    briefDescription, status, user.name as lecturerName, disabled
    from course
    left join category on categoryID = category.id
    left join user on lecturerID = user.id
    ORDER BY views DESC LIMIT 10`));
  },
  async new() {
    return await db.select(db.raw(`course.*, user.name as "lecturerName", category.name as categoryName
    from course, user, category
    where user.id = course.lecturerID and course.categoryID = category.id
    ORDER BY createdDate DESC LIMIT 10`));
  },
  async sylabus(id) {
    return await db.select(db.raw(`* from sylabus LEFT join course on sylabus.courseID = course.id WHERE course.id = ${id}`));
  },
  async review(id) {
    return await db.select(db.raw(`course.*,student_course.*,user.avatarURL, user.name as 'username' from course LEFT join student_course on student_course.courseID = course.id left join user on studentID = user.id WHERE course.id = ${id}`));
  },
  async relate(id) {
    return await db.select(db.raw(`course.price, course.salePrice, course.rating, course.numRate ,URL,course.id as "courseID", category.id as "categoryID", course.name as "courseName", category.name as "categoryName",COUNT(student_course.courseID) as "register", user.name as "lecturer", course.disabled, status
    from course 
    left join student_course on course.id = student_course.courseID
    left join category on category.id = course.categoryID 
    left join user on lecturerID = user.id
    WHERE course.id <> ${id} AND category.id = (
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
  ,

  async getWithCategory(category) {
    return await db.select(db.raw(`id, views from course where categoryID = ${category} 
    ORDER BY views DESC LIMIT 10`));
  },
  
  async getLecturerCourse(lecturerID) {
    return await db.raw(`select course.*, category.name as categoryName
    from course, category
    where category.id = course.categoryID and course.lecturerID = ${lecturerID}`);
  }
};
// select categoryID, count(categoryID) as count
// FROM student_course INNER JOIN course on courseID = id
// WHERE WEEK(CURDATE()) = WEEK(student_course.registerDate)
// GROUP by categoryID ORDER by count DESC LIMIT 10