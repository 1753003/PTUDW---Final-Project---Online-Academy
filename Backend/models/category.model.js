const db = require('../utils/db');
module.exports = {
    getAll() {
        return db('category');
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
        return "success";
    },

    async edit(id, category) {
      await db("category").where("id", id)
        .update({
          name: category.name,
        });
      return "success";
    }
    
};