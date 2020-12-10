const express = require('express');
const categoryModel = require('../models/category.model');
const router = express.Router();

router.get('/', async function(req, res) {
    const list = await categoryModel.getAll();
    res.json(list);
})

router.get('/:id', function(req, res) {

})

router.post('/', function(req, res) {

})

router.delete('/:id', function(req, res) {

})

router.patch('/:id', function(req, res) {

})

module.exports = router;