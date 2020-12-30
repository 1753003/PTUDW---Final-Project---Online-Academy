const { update } = require('../utils/db');
const db = require('../utils/db');
module.exports = {
    async add(courseID, newSylabus) {
        await db('sylabus').insert(newSylabus).where('courseID', courseID);
    },
    async update(courseID, week, newLesson) {
        await db('sylabus')
        .where({
            courseID: courseID,
            week: week
        })
        .update({
            lesson: newLesson.lesson,
            videoLink: newLesson.videoLink
        })

        return newLesson;
    }
};