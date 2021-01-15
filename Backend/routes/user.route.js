const express = require('express');
const bcrypt = require('bcryptjs');

const userModel = require('../models/user.model');
const e = require('express');
const { response } = require('express');
const userSchema = require('../schemas/user.json');
const validation = require('../middleware/validation.mdw');
const router = express.Router({mergeParams: true});

router.post('/',validation(userSchema), async function (req, res) {
  const check = await userModel.singleByMail(req.body.email);
  if (check != null) {
    return res.status(200).json("Exist");
  }

  const check2 = await userModel.singleByUserName(req.body.username);
  if (check2 != null) {
    return res.status(200).json("UExist")
  }

  console.log(req.body);
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 10);
  if (user.type == undefined || user.type == "" || user.type == "undefined")
    user.type = 'student'
  console.log(user);
  user.name = user.username
  user.id = await userModel.add(user);
  delete user.password;
  res.status(201).json(user);
}),

router.post('/:uid/review/:cid', async function(req, res){
  // let uid = req.params.uid;
  // let cid = req.params.cid;
  // let data = req.body;
  // userModel.editRegisterCourse(cid, uid, data);
  // res.status(200).json({});
  const temp = await userModel.getRegisterCourseDetail(req.params.uid, req.params.cid);
  let existed = false;
  if (temp.length == 0)
    existed = true;
  console.log('asdgfkj',temp)
  // if (existed ) {
  //   try {
  //     await userModel.courseRegister(req.params.uid, req.params.cid, req.body);
  //   }
  //   catch(err) {
  //     console.log("ERROR:",err);
  //   }
  // }
  res.status(201).json({available: existed});
}),

router.post('/:uid/favorite/:cid', async function(req, res){
  // let uid = req.params.uid;
  // let cid = req.params.cid;
  // userModel.addFavorite(uid, cid);
  // res.status(200).json({});
  const temp = await userModel.getSingleFavorite(req.params.uid, req.params.cid);
  let existed = false;
  if (temp.length == 0)
    existed = true;
  // console.log(temp,available)
  if (existed ) {
    try {
      await userModel.addFavorite(req.params.uid, req.params.cid, req.body);
    }
    catch(err) {
      console.log("ERROR:",err);
    }
  }
  res.status(201).json({available: existed,temp});
}),

router.post('/:uid/courseRegister/:cid', async function(req, res){
  const temp = await userModel.getRegisterCourseDetail(req.params.uid, req.params.cid);
  let available = false;
  if (temp[0].length == 0)
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
  res.status(201).json({available:available});
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
  const temp = await userModel.getRegisterCourseDetail(req.params.uid, req.params.cid);
  let existed = false;
  if (temp[0].length > 0)
    {
    if (!(temp[0][0].rate == null && temp[0][0].comments == null)){
      existed = true;
    }
  }
  var status = existed?'NOTAVAILABLE':'AVAILABLE'
  if (temp[0].length == 0){
    status = 'NOTENROLL'
  }
  // console.log('asdgfkj',temp[0].length, temp[0])

  if (status!= 'NOTENROLL' ) {
    try {
      await userModel.editRegisterCourse(req.params.uid, req.params.cid, req.body);
    }
    catch(err) {
      console.log("ERROR:",err);
    }
  }
  res.status(201).json({status: status});
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
  console.log(uid);
  try {await userModel.delUser(uid)}
  catch(err) {
    console.log(err);
  };
  console.log("ab");
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

router.get('/changePasswordRequest/:uid', async function(req, res){
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
    subject: 'Pondemy team - Change your current password',
    html: `<h2>You have a new change current password request!</h2> 
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

  res.json("Success");
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
  console.log(req.body);
  const email = req.body.email.email;
  const user = await userModel.singleByMail(email);
  
  if (user == null) {
    return res.status(404).json("FAIL");
  }
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'group7.17clc@gmail.com',
      pass: 'group7.17clc'
    }
  });
  
  var token = user.token;
  // console.log(token);
  var result = token[0] + token[1] + token[2] + token[3] + token[4] + token[5];
  // console.log(result);
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

  res.json("OK");
});

router.post('/confirmEmail', async function(req, res){
  const check = await userModel.singleByMail(req.body.email);
  if (check != null) {
    return res.status(200).json("Exist");
  }

  const check2 = await userModel.singleByUserName(req.body.username);
  if (check2 != null) {
    return res.status(200).json("UExist")
  }
  
  var nodemailer = require('nodemailer');
  const email = req.body.email;

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'group7.17clc@gmail.com',
      pass: 'group7.17clc'
    }
  });
  
  const user = await userModel.singleByMail("admin@gmail.com");
  const token = user.token;

  const n = Math.floor(Math.random() * 20);
  const result = token[n] + token[n+1] + token[n+2] + token[n+3] + token[n+4] + token[n+5];

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

  res.json(true);
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

router.post('/confirmCodeEmail', async function(req,res) {
  const user = await userModel.singleByMail("admin@gmail.com");
  const token = user.token;
  const code = req.body.code;
  console.log(code);
  console.log(token);
  if (token.includes(code) && code.length === 6)
    return res.json(true);
  return res.json(false);
})

router.post('/confirmCodeWithEmail', async function(req, res) {
  console.log(req.body.email);
  const user = await userModel.singleByMail(req.body.email);
  const token = user.token;
  const code = token[0]+token[1]+token[2]+token[3]+token[4]+token[5];
  console.log(code, req.body.code)
  if (code == req.body.code)
    res.json(true);
  else
    res.json(false);
})

router.post('/changePassword/:uid' ,validation(userSchema),async function(req, res) {
  const password = bcrypt.hashSync(req.body.password, 10);
  try {
    await userModel.edit(req.params.uid, {password: password});
    res.json("OK")
  }
  catch (error) {
    res.json("FAIL")
  }
})

router.post('/changePasswordWithEmail' ,validation(userSchema),async function(req, res) {
  const password = bcrypt.hashSync(req.body.password, 10);
  console.log(req.body);
  const user = await userModel.singleByMail(req.body.email);
  console.log(user)
  try {
    await userModel.edit(user.id, {password: password});
    res.json("OK")
  }
  catch (error) {
    res.json("FAIL")
  }
})

router.post('/resetConfirm',validation(userSchema), async function(req,res){
  console.log(req.body)
  const password = bcrypt.hashSync(req.body.password, 10);
  const user = await userModel.singleByMail(req.body.email);
  const ret = await userModel.edit(user.id, {password: password})
  res.json(ret)
})
module.exports = router;
