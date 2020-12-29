const db = require('../utils/db');
module.exports = {
    async add(courseID, newSylabus) {
        await db('sylabus').insert(newSylabus).where('courseID', courseID);
    },
};