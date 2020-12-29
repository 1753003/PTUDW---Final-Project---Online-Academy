const express = require('express');
const studentCourseModel = require('../models/student_course.model');
const courseModel = require('../models/course.model');
const router = express.Router();

/*router.get('/lecturer/:id', async function(req, res) {
    console.log("abc");
    
})*/

router.get('/lecturer/:id', async function(req, res) {
    const lecturerID = req.params.id;
    const listCourse = await courseModel.getLecturerCourse(lecturerID);
    const result = [];
    for (const item of listCourse) {
        const sylabus = await courseModel.sylabus(item.id);
        console.log(sylabus);
        result.push({
            "courseID": item.id,
            "Sylabus": sylabus
        })
    }
    res.json(result);
})

router.post('/:courseID', async function(req, res) {
    const newSylabus = req.body;
    const courseID = req.params.courseID;
    const list = await studentCourseModel.getSylabus(courseID);
    const studentID = await studentCourseModel.getStudentID(courseID);

    list.forEach(element => {
        element.sylabus.push(newSylabus);
        studentCourseModel.updateSylabus(courseID, element.sylabus, 3);
    });

    res.json(list);
})


module.exports = router;