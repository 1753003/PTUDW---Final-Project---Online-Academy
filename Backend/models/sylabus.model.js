const db = require('../utils/db');
module.exports = {
    async add(courseID, newSylabus) {
        await db('sylabus').add(newSylabus).where('courseID', courseID);
    },
};