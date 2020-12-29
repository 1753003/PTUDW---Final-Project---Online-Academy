const db = require('../utils/db');
const { updateSylabusById } = require('./course.model');

module.exports = {
    async getSylabus(courseID) {
        return await db('student_course').select('sylabus','studentID').where('courseID', courseID);
    },

    async getStudentID(courseID) {
        return await db('student_course').select('studentID').where('courseID', courseID);
    },

    async updateSylabus(courseID, newSylabus, studentID) {
        const replace = /\\n/gi;
        const temp = (JSON.stringify(newSylabus)).replace(replace, "\\\\n");
     
        return await db.raw(`update student_course
            set student_course.sylabus = '${temp}'
            where student_course.studentID = ${studentID} and student_course.courseID = ${courseID}`)
    }
}