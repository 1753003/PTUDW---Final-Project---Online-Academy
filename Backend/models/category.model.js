const db = require('../utils/db');
db.on('query', console.log)
module.exports = {
    async getAll() {
        return  await db('category');
    },

    async getById(id) {
        const list = await db('category').where('id', id);
        if (list.length === 0) {
          return null;
        }
    h
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