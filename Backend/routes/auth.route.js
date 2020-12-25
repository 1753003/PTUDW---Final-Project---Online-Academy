const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const randToken = require('rand-token');

const userModel = require('../models/user.model');
const { response } = require('express');

const router = express.Router();
router.post('/', async function (req, res) {
  console.log(req.body)
  const user = await userModel.singleByUserName(req.body.username);
  if (user === null) {
    return res.json({
      authenticated: false
    });
  }

  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.json({
      authenticated: false
    });
  }
if(req.body.autoLogin){
  var accessToken = jwt.sign({
    userId: user.id
  }, 'SECRET_KEY', {
    expiresIn: "30d"
  });
}else{
  var accessToken = jwt.sign({
    userId: user.id
  }, 'SECRET_KEY', {
    expiresIn: "2h"
  });
}

  const refreshToken = randToken.generate(80);
  await userModel.updateRefreshToken(user.id, refreshToken);
  res.cookie('rfToken', refreshToken);
  res.cookie('aToken', accessToken);
  // console.log(user)
  let responseData = {
    authenticated: true,
    status:"ok",
    username : user.username,
    email: user.email,
    type:user.type,
    uid:user.id,
    currentAuthority: user.type,
  }
  res.json(responseData)
})

// req.body = {
//   accessToken: '',
//   refreshToken: ''
// }
router.post('/refresh', async function (req, res) {
  console.log(req.body)
  const payload = jwt.verify(req.body.accessToken, 'SECRET_KEY', { ignoreExpiration: true });
  const refreshToken = req.body.refreshToken;
  const ret = await userModel.isRefreshTokenExisted(payload.userId, refreshToken);
  if (ret === true) {
    const accessToken = jwt.sign({
      userId: payload.userId
    }, 'SECRET_KEY', {
      expiresIn: "2h"
    });

    return res.json({ accessToken });
  }

  res.status(400).json({
    message: 'Invalid refresh token.'
  });
})
module.exports = router;
