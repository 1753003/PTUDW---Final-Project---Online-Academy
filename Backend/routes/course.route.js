const express = require('express');
const courseModel = require('../models/course.model');

const router = express.Router();

router.get('/', async function (req, res) {
  const list = await courseModel.getAll();
  res.json(list);
})

router.get('/:id', async function (req, res) {
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
  res.status(201).json({ id: id });
})
router.delete('/:id', async function (req, res) {
  const id = req.params.id || -1;
  await courseModel.delById(id).then(()=>{
    res.status(201).json({id : id});
  }).catch(()=>{
    res.status(201).json({id : "error"});
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

router.patch('/hot', async function (req, res) {
  
})
router.patch('/trending', async function (req, res) {
  
})
router.patch('/new', async function (req, res) {
  
})
module.exports = router;
