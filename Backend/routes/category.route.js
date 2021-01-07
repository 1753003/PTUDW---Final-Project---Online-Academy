const express = require('express');
const categoryModel = require('../models/category.model');
const router = express.Router();

router.get('/', async function(req, res) {
    const list = await categoryModel.getAll();
    res.json(list);
})

router.get('/getAll', function(req, res) {
    res.json(categoryModel.getAllInfo());
})

router.get('/getHot', async function(req, res) {
    const result = await categoryModel.getHot();
    console.log(typeof(result));
    res.json(result);
})
router.get('/:id', async function(req, res) {
    const category = await categoryModel.getById(req.params.id);
  
    if (category == null) {
        return res.status(204).json({});
    }
    res.json(category);
})


const schema = require('../schemas/category.json');

router.post('/', async function(req, res) {
    const list = await categoryModel.add(req.body);
    res.json(await categoryModel.getAll());
})

router.delete('/:id', async function(req, res) {
    await categoryModel.delete(req.params.id);
    res.json(await categoryModel.getAll());
})

router.patch('/:id', async function(req, res) {
    const category = await categoryModel.edit(req.params.id, req.body);
    res.json(category);
})

router.get('/getAll', function(req, res) {
    res.json(categoryModel.getAllInfo());
})


module.exports = router;