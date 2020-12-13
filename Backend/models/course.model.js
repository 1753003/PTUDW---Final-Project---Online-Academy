const db = require('../utils/db');

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
  }
};
