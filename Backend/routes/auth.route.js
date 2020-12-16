const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const randToken = require('rand-token');

const userModel = require('../models/user.model');

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

  const accessToken = jwt.sign({
    userId: user.id
  }, 'SECRET_KEY', {
    expiresIn: 10 * 60
  });

  const refreshToken = randToken.generate(80);
  await userModel.updateRefreshToken(user.id, refreshToken);

  res.json({
    authenticated: true,
    accessToken,
    refreshToken
  })
})

// req.body = {
//   accessToken: '',
//   refreshToken: ''
// }
router.post('/refresh', async function (req, res) {
  const payload = jwt.verify(req.body.accessToken, 'SECRET_KEY', { ignoreExpiration: true });
  const refreshToken = req.body.refreshToken;
  const ret = await userModel.isRefreshTokenExisted(payload.userId, refreshToken);
  if (ret === true) {
    const accessToken = jwt.sign({
      userId: payload.userId
    }, 'SECRET_KEY', {
      expiresIn: 10 * 6000
    });

    return res.json({ accessToken });
  }

  res.status(400).json({
    message: 'Invalid refresh token.'
  });
})
module.exports = router;
