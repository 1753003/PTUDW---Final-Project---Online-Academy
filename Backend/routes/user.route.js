const express = require('express');
const bcrypt = require('bcryptjs');

const userModel = require('../models/user.model');
const e = require('express');

const router = express.Router({mergeParams: true});

router.post('/', async function (req, res) {
  const user = req.body;
  console.log(req.body)
  const check = await userModel.singleByMail(req.body.email);
  if (check != null) {
    return res.status(200).json({
      signup: "failed"
    });
  }
  user.password = bcrypt.hashSync(user.password, 10);
  user.type = 'student'
  user.name = user.username
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
  const temp = await userModel.getRegisterCourseDetail(req.params.uid, req.params.cid);
  let available = false;
  if (temp.length == 0)
    available = true;
  console.log(temp,available)
  if (available ) {
    try {
      await userModel.courseRegister(req.params.uid, req.params.cid, req.body);
    }
    catch(err) {
      console.log("ERROR:",err);
    }
  }
  res.status(201).json({available});
});

router.get('/:uid([0-9]+)', async function(req,res){
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

router.get('/:uid/favorite', async function(req,res){
  const uid = req.params.uid || -1;
  const list = await userModel.getFavorite(uid);
  res.json(list);
});

router.get('/:uid/courseRegister', async function(req, res){
  const uid = req.params.uid || -1;
  const list = await userModel.getRegisterCourse(uid);
  res.json(list);
});
router.get('/:uid/courseRegister/:cid', async function(req, res){
  const uid = req.params.uid || -1;
  const cid = req.params.cid || -1;
  const list = await userModel.getRegisterCourseDetail(uid, cid);
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
  const uid = req.params.uid;
  console.log("Data:", data);
  await userModel.edit(uid, data);
  const newData = await userModel.singleById(uid);
  res.status(201).json(newData);
});

router.delete('/:uid',async function(req, res){
  const uid = req.params.uid || -1; 
  await userModel.delUser(uid);

  const list = await userModel.getAllByType("student");
  const list2 = await userModel.getAllByType("lecturer");
  res.status(201).json([list, list2]);
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

router.get('/changePassword/:uid', async function(req, res){
  var nodemailer = require('nodemailer');
  const email = await userModel.getEmail(req.params.uid);

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'group7.17clc@gmail.com',
      pass: 'group7.17clc'
    }
  });
  
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < 6; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  var mailOptions = {
    from: 'group7.17clc@gmail.com',
    to: email[0].email,
    subject: 'Pondemy team - Change your password',
    html: `<h2>You have a new change password request!</h2> 
    <p>Here are your code to change your password: ${result}</p>
    <p>Ignoring this email if it is not your request.</p>
    <hr/>
    <p>Best,</p>
    <p>Pondemy team.</p>`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.json(result);
});

router.get('/changeEmailRequest/:uid', async function(req, res){
  var nodemailer = require('nodemailer');
  const temp = await (userModel.getEmail(req.params.uid));
  const email = temp[0].email;
  const user = await userModel.singleByMail(email);
  
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'group7.17clc@gmail.com',
      pass: 'group7.17clc'
    }
  });
  
  var token = user.token;
  var result = token[0] + token[1] + token[2] + token[3] + token[4] + token[5];

  var mailOptions = {
    from: 'group7.17clc@gmail.com',
    to: email,
    subject: 'Pondemy team - Change your current email',
    html: `<h2>You have a new change current email request!</h2> 
    <p>Here are your code to change your email: ${result}</p>
    <p>Ignoring this email if it is not your request.</p>
    <hr/>
    <p>Best,</p>
    <p>Pondemy team.</p>`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.json("Success");
});

router.post('/forgotPassword', async function(req, res){
  var nodemailer = require('nodemailer');
  const email = req.body.email.email;
  const user = await userModel.singleByMail(email);
  
  if (user == null) {
    return res.status(404).json("Not exist");
  }
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'group7.17clc@gmail.com',
      pass: 'group7.17clc'
    }
  });
  
  var token = user.token;
  console.log(token);
  var result = token[0] + token[1] + token[2] + token[3] + token[4] + token[5];
  console.log(result);
  var mailOptions = {
    from: 'group7.17clc@gmail.com',
    to: email,
    subject: 'Pondemy team - Reset your password',
    html: `<h2>Reset your password on Pondemy website!</h2> 
    <p>Here are your code to reset your password: ${result}</p>
    <p>Ignoring this email if it is not yours.</p>
    <hr/>
    <p>Best,</p>
    <p>Pondemy team.</p>`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.json(result);
});

router.post('/confirmEmail', function(req, res){
  var nodemailer = require('nodemailer');
  const email = req.body.email;

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'group7.17clc@gmail.com',
      pass: 'group7.17clc'
    }
  });
  
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < 6; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  var mailOptions = {
    from: 'group7.17clc@gmail.com',
    to: email,
    subject: 'Pondemy team - Confirm your email',
    html: `<h2>Confirm your email on Pondemy website!</h2> 
    <p>Here are your code to confirm your email: ${result}</p>
    <p>Ignoring this email if it is not you.</p>
    <hr/>
    <p>Best,</p>
    <p>Pondemy team.</p>`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.json(result);
});

router.post('/confirmCode/:uid', async function(req, res) {
  const temp = await (userModel.getEmail(req.params.uid));
  const email = temp[0].email;
  const user = await userModel.singleByMail(email);
  const token = user.token;
  const code = token[0]+token[1]+token[2]+token[3]+token[4]+token[5];
  console.log(code, req.body.code)
  if (code == req.body.code)
    res.json(true);
  else
    res.json(false);
});

router.post('/resetConfirm', async function(req,res){
  console.log(req.body)
  const password = bcrypt.hashSync(req.body.password, 10);
  const user = await userModel.singleByMail(req.body.email);
  const ret = await userModel.edit(user.id, {password: password})
  res.json(ret)
})
module.exports = router;
