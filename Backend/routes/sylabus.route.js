const express = require('express');
const studentCourseModel = require('../models/student_course.model');
const courseModel = require('../models/course.model');
const sylabusModel = require('../models/sylabus.model');
const router = express.Router();

const sylabusSchema = require('../schemas/sylabus.json');
const validation = require('../middleware/validation.mdw');
router.get('/lecturer/:id', async function(req, res) {
    const lecturerID = req.params.id;
    const listCourse = await courseModel.getLecturerCourse(lecturerID);
    const result = [];
    for (let item of listCourse[0]) {
        console.log("Item",item);
        const sylabus = await courseModel.sylabus(item.id);
        console.log(sylabus);
        result.push({
            "courseID": item.id,
            "Sylabus": sylabus
        })
    }
    res.json(result);
})

router.post('/:courseID',validation(sylabusSchema), async function(req, res) {
    const newSylabus = req.body;
    const courseID = req.params.courseID;
    const list = await studentCourseModel.getSylabus(courseID);
    const studentID = await studentCourseModel.getStudentID(courseID);
    newSylabus.week = Number(newSylabus.week);
    console.log(typeof(newSylabus.week));
    let i = 0;
    list.forEach(element => {
        element.sylabus.push(newSylabus);
        studentCourseModel.updateSylabus(courseID, element.sylabus, studentID[i].studentID);
        i++;
    });
    const temp = {
        "courseID": newSylabus.courseID,
        "week": newSylabus.week,
        "lesson": newSylabus.lesson,
        "videoLink": newSylabus.videoLink
    }
    await sylabusModel.add(courseID, temp);

    res.json(list);
})

router.patch('/:courseID', async function(req, res) {
    const lesson = req.body;
    const courseID = req.params.courseID;

    const result = await sylabusModel.update(courseID, lesson.week, lesson);

    const list = await studentCourseModel.getSylabus(courseID);
    const studentID = await studentCourseModel.getStudentID(courseID);

    let i = 0;
    list.forEach(element => {
        if (element.sylabus[0].name == lesson.name)
        {
            for (let item of element.sylabus) {
                if (item.week == lesson.week) {
                    item.lesson = lesson.lesson;
                    item.videoLink = lesson.videoLink;
                    console.log(element.sylabus);
                    studentCourseModel.updateSylabus(courseID, element.sylabus, studentID[i].studentID);
                    i++;
                }
            }
        } 
    });

    res.json(result);
})
module.exports = router;