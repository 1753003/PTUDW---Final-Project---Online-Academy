const express = require('express');
const bcrypt = require('bcryptjs');

const userModel = require('../models/user.model');

const router = express.Router();

router.post('/', async function (req, res) {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 10);

  user.id = await userModel.add(user);
  delete user.password;
  res.status(201).json(user);
}),
router.post('/course', async function(req, res){
  let uid = req.params.uid;
  let cid = req.params.cid;
  let data = req.body;
  userModel.review(cid, uid, data);
  res.status(200).json({});
}),
router.post('/favorite', async function(req, res){
  let uid = req.params.uid;
  let cid = req.params.cid;
  userModel.favorite(uid, cid);
  res.status(200).json({});
}),
router.post('/cr', async function(req, res){
  await userModel.courseRegister(req.body.uid, req.body.cid);
  res.status(201).json({});
});
module.exports = router;
