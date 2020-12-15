const express = require('express');
const bcrypt = require('bcryptjs');

const userModel = require('../models/user.model');

const router = express.Router({mergeParams: true});

router.post('/', async function (req, res) {
  const user = req.body;
  const check = await userModel.singleByMail(req.body.mail);
  if (check != null) {
    return res.status(200).json({
      signup: "failed"
    });
  }
  user.password = bcrypt.hashSync(user.password, 10);

  user.id = await userModel.add(user);
  delete user.password;
  res.status(201).json(user);
}),
router.post('/:uid/review/:cid', async function(req, res){
  let uid = req.params.uid;
  let cid = req.params.cid;
  let data = req.body;
  userModel.editRegisterCourse(cid, uid, data);
  res.status(200).json({});
}),
router.post('/:uid/favorite/:cid', async function(req, res){
  let uid = req.params.uid;
  let cid = req.params.cid;
  userModel.addFavorite(uid, cid);
  res.status(200).json({});
}),
router.post('/:uid/courseRegister/:cid', async function(req, res){
  await userModel.courseRegister(req.params.uid, req.body.cid);
  res.status(201).json({});
});
router.get('/:uid([0-9]+)', async function(req,,res){
  const id = req.params.uid || -1;
  const user = await userModel.singleById(id);

  if (user === null) {
    return res.status(204).json({});
  }
  res.json(user);
});
router.delete('/:uid/favorite/:cid', async function(req, res){
  const uid = req.params.uid || -1;
  const cid = req.params.cid || -1;
  await userModel.delFavorite(uid,cid);
  res.status(201).json({id : uid});
});
router.get('/:uid/favorite', async function(req,,res){
  const uid = req.params.uid || -1;
  const list = await userModel.getFavorite(uid);
  res.json(list);
});
router.get('/:uid/courseRegister', async function(req, res){
  const uid = req.params.uid || -1;
  const list = await userModel.getRegisterCourse(uid);
  res.json(list);
});
router.patch('/:uid/courseRegister/:cid', async function(req, res){
  const uid = req.params.uid || -1;
  const cid = req.params.cid || -1;
  const data = req.body
  await userModel.editRegisterCourse(uid,cid,data);
  res.status(201).json({id : uid});
});
router.patch('/:uid', async function(req, res){
  const cid = req.params.cid || -1;
  const data = req.body
  await userModel.edit(uid, data);
  res.status(201).json({id : uid});
});
router.delete('/:uid',async function(req, res){
  const uid = req.params.uid || -1;
  await userModel.delUser(uid);
  res.status(201).json({id : uid});
});
router.get('/student',async function(req, res){
  const list = await userModel.getAllByType("student");
  res.json(list);
});
router.get('/lecturer',async function(req, res){
  const list = await userModel.getAllByType("lecturer");
  res.json(list);
});
router.get('/:uid/lectureList',async function(req, res){
  const uid = req.params.uid || -1;
  const list = await userModel.getLectureCourse(uid);
  res.json(list);
});
router.post('/:uid', async function(req, res){
  // change password
})
module.exports = router;
