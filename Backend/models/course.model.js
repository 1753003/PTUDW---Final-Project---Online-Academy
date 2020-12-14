const knex = require('../utils/db');
const db = require('../utils/db');
knex.on('query', console.log)
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
    return knex.select(knex.raw(`* FROM course WHERE MATCH(name) AGAINST('${keyword}' IN NATURAL LANGUAGE MODE)`)); 
  }
};
