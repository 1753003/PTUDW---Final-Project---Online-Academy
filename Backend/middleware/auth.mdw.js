const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  //if guest
  // open some api
  //here
  const link = req.protocol + '://' + req.get('host') + req.originalUrl
  // console.log(link)
  // console.log(req.method)
  const accessToken = req.headers['x-access-token'];
  if(accessToken == 'undefined'){
    if(req.method == "GET" && link.includes('course')){
      console.log('guest');
      next()
    }
  }
  else if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, 'SECRET_KEY');
      req.accessTokenPayload = decoded;
    } catch (err) {
      // console.log(err);
      // if(req.method == "GET"){
      //   console.log('get', err);
      //   // next()
      // }else
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