const express = require('express');
const courseModel = require('../models/course.model');
const studentCourseModel = require('../models/student_course.model')
const router = express.Router({mergeParams: true});
const sylabusModel = require('../models/sylabus.model');
const favoriteCourseModel = require('../models/favorite_course.model');

const courseSchema = require('../schemas/course.json');
const validation = require('../middleware/validation.mdw');
router.get('/:id([0-9]+)', async function (req, res, next) {
  const id = req.params.id || -1;
  const course = await courseModel.singleById(id);

  if (course === null) {
    return res.status(204).json({});
  }
  res.json(course);
})

// const courseSchema = require('../schemas/course.json');
// const validation = require('../middleware/validation.mdw');
router.post('/',validation(courseSchema), async function (req, res) {
  const id = await courseModel.add(req.body);
  res.status(201).json(await courseModel.getAll());
})

router.delete('/:id', async function (req, res) {
  const id = req.params.id || -1;
  
  await sylabusModel.deleteByCourseID(id).then(
    async() => {
      await studentCourseModel.deleteByCourseID(id).then(
        async () => {
          await favoriteCourseModel.deleteByCourseID(id).then(
            async() => {
              await courseModel.delById(id).then(async()=>{
                const list = await courseModel.getAll();
                res.status(201).json(list);
              }).catch(async(error)=>{
                console.log(error);
                res.status(201).json(await courseModel.getAll());
              })
            }
          )
        }
      )
    }
  )
})

router.patch('/:id', async function (req, res) {
  const id = req.params.id || -1;
  const course = req.body;
  await courseModel.updateById(id, req.body);
  const list = await studentCourseModel.getSylabus(id);
  const studentID = await studentCourseModel.getStudentID(id);
  let i = 0;
  list.forEach(element => {
      if (element.courseID == id)
      {
          for (let item of element.sylabus) {
              console.log(item);
              item.name = course.name;
              item.description = course.detailDescription;
              studentCourseModel.updateSylabus(id, element.sylabus, studentID[i].studentID);
              
          }
          i++;
      } 
  });
  res.status(201).json({id : id});
  
})
router.get('/search', async function(req, res){
  console.log(req.query.q)
  const keyword = req.query.q
  const list = await courseModel.searchByKeyword(keyword);
  list.forEach(item => {
    console.log(item.disabled);
    console.log(typeof(item.disabled))
  })
  res.json(list[0].filter(item => item.disabled === 1));
})
router.get('/hot', async function (req, res) {
  const list = await courseModel.hot();
  res.json(list.filter(item => item.disabled === 1));
})
router.get('/trending', async function (req, res) {
  const list = await courseModel.trending();
  res.json(list.filter(item => item.disabled === 1));
})
router.get('/new', async function (req, res) {
  const list = await courseModel.new();
  res.json(list.filter(item => item.disabled === 1));
})
router.get('/:id/sylabus', async function (req, res) {
  const list = await courseModel.sylabus(req.params.id);
  res.json(list);
})
router.get('/:id/review', async function (req, res) {
  const list = await courseModel.review(req.params.id);
  res.json(list);
})
router.get('/:id/relate', async function (req, res) {
  const list = await courseModel.relate(req.params.id);
  res.json(list.filter(item => item.disabled === 1));
})
router.post('/:id/sylabus', async function (req, res) {
  const id = await courseModel.addSylabus(req.params.id, req.body);
  res.status(201).json({ id: id });
})

router.patch('/:id/sylabus', async function (req, res) {
  const id = await courseModel.updateSylabusById(req.params.id, req.body);
  res.status(201).json({ id: id });
})

router.get('/getAll', async function(req, res) {
  res.json(await courseModel.getAllInfo());
})

router.get('/getWithCategory', async function(req, res) {
  res.json(await courseModel.getWithCategory(req.query.c));
})

router.get('/getLecturerCourse/:id', async function(req, res) {
  res.json(await courseModel.getLecturerCourse(req.params.id));
})

router.get('/', async function (req, res) {
  const list = await courseModel.getAll();
  res.json(list);
})

router.patch('/disabled/:id', async function (req, res) {
  const list = await courseModel.disabled(req.params.id, req.body);
  res.json(list);
})

module.exports = router;
