const db = require('../utils/db');
module.exports = {
    async deleteByCourseID(courseID) {
        await db('favoriteCourse')
        .where('courseID',courseID)
        .del();
    }
};