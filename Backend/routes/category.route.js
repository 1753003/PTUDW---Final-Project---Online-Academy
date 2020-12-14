const express = require('express');
const categoryModel = require('../models/category.model');
const router = express.Router();

router.get('/', async function(req, res) {
    const list = await categoryModel.getAll();
    res.json(list);
})

router.get('/:id', async function(req, res) {
    const category = await categoryModel.getById(req.params.id);
  
    if (category == null) {
        return res.status(204).json({});
    }
    res.json(category);
})

router.post('/', function(req, res) {

})

router.delete('/:id', async function(req, res) {
    res.json(await categoryModel.delete(req.params.id));
})

router.patch('/:id', function(req, res) {

})

module.exports = router;