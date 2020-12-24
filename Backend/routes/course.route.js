const express = require('express');
const courseModel = require('../models/course.model');

const router = express.Router({mergeParams: true});


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
router.post('/', async function (req, res) {
  const id = await courseModel.add(req.body);
  res.status(201).json(await courseModel.getAll());
})

router.delete('/:id', async function (req, res) {
  const id = req.params.id || -1;
  await courseModel.delById(id).then(async()=>{
    const list = await courseModel.getAll();
    res.status(201).json(list);
  }).catch(async()=>{
    res.status(201).json(await courseModel.getAll());
  })
})

router.patch('/:id', async function (req, res) {
  const id = req.params.id || -1;
  await courseModel.updateById(id, req.body).then(()=>{
    res.status(201).json({id : id});
  }).catch(()=>{
    res.status(201).json({id : id});
  })
})
router.get('/search', async function(req, res){
  console.log(req.query.q)
  const keyword = req.query.q
  const list = await courseModel.searchByKeyword(keyword);
  res.json(list[0]);
})
router.get('/hot', async function (req, res) {
  const list = await courseModel.hot();
  res.json(list);
})
router.get('/trending', async function (req, res) {
  const list = await courseModel.trending();
  res.json(list);
})
router.get('/new', async function (req, res) {
  const list = await courseModel.new();
  res.json(list);
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
  res.json(list);
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
router.get('/', async function (req, res) {
  const list = await courseModel.getAll();
  res.json(list);
})
module.exports = router;
