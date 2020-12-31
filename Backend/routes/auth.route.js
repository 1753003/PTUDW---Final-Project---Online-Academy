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
    expiresIn: "300s"
  });
}
const stay = req.body.autoLogin == true? 315360000000:1000*60*60*24
  const refreshToken = randToken.generate(80);
  await userModel.updateRefreshToken(user.id, refreshToken);
  res.cookie('rfToken', refreshToken,{ expires: new Date(Date.now() + stay)});
  res.cookie('aToken', accessToken,{ expires: new Date(Date.now() + stay)});
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
  if(refreshToken)
    {const ret = await userModel.isRefreshTokenExisted(payload.userId, refreshToken);
    if (ret === true) {
      var accessToken = jwt.sign({
        userId: payload.userId
      }, 'SECRET_KEY', {
        expiresIn: "300s"
      });
      res.cookie('aToken', accessToken,{ expires: new Date(Date.now() + 315360000000)});
    }
    return res.json({ accessToken });
  }

  res.status(400).json({
    message: 'Invalid refresh token.'
  });
})
module.exports = router;
