const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const accessToken = req.headers['x-access-token'];
  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, 'SECRET_KEY');
      req.accessTokenPayload = decoded;
    } catch (err) {
      // console.log(err);
      return res.status(401).json({
        message: 'Invalid access token.'
      })
    }
    next();
  } else {
    return res.status(400).json({
      message: 'Access token not found.'
    })
  }
}