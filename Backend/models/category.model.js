const db = require('../utils/db');
module.exports = {
    async getAll() {
        return  await db('category');
    },

    async getHot() {
      console.log("AB")
      const res = await db.raw(`select categoryID, count(categoryID) as count, category.name, backgroundURL
      FROM student_course INNER JOIN course on courseID = course.id
      LEFT JOIN category on categoryID = category.id
      GROUP by categoryID ORDER by count DESC LIMIT 8`);
      // console.log(res[0]);

      return res;
    },

    async getById(id) {
        const list = await db('category').where('id', id);
        if (list.length === 0) {
          return null;
        }
        return list[0];
      },
    async delete(id) {
        await db('category').where('id', id).del();
    },

    async edit(id, category) {
      await db("category")    
      .where("id", id)
      .update({
          name: category.name,
        });
      
      return db("category");
    },
    
    async add(category) {
      await db('category')
      .insert(category);
    },

};