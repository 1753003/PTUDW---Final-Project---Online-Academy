const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  //if guest
  // open some api
  //here
  const link = req.protocol + '://' + req.get('host') + req.originalUrl
  // console.log(link)
  // console.log(req.method)
  const accessToken = req.headers['x-access-token'];
  console.log(req.originalUrl)
  console.log(req.originalUrl =='/api/user')
  if(req.method == "POST" && req.originalUrl =='/api/user'){
    next()
  }
  else if(req.method == "GET" && req.originalUrl.includes('/api/user')){
    next()
  }
  else if(accessToken == 'undefined'){
    if(req.method == "GET" && link.includes('course')){
      console.log('GUEST', req.method );
      next()
    }
    if(req.method == "POST" && link.includes('forgotPassword')){
      console.log('GUEST', req.method );
      next()
    }
    if(req.method == "POST" && link.includes('confirmCode')) {
      console.log('GUEST', req.method);
      next()
    }
    if(req.method == "GET" && link.includes('category/getHot')){
      console.log('GUEST', req.method );
      next()
    }
    if(req.method == "GET" && link.includes('category/getMenu')){
      console.log('GUEST', req.method );
      next()
    }
  }
  else if (accessToken) {
    try {
      // console.log('wat', req.method );
      const decoded = jwt.verify(accessToken, 'SECRET_KEY');
      req.accessTokenPayload = decoded;
    } catch (err) {
      // console.log(err);
      // if(req.method == "GET"){
      //   console.log('get', err);
      //   // next()
      // }else
      // console.log('guest', req.method );
        return res.status(401).json({
          message: 'Invalid access token.'
        })
    }
    // console.log('guest', req.method );
    next();
  } else {
    // console.log('guest', req.method );
    return res.status(400).json({
      message: 'Access token not found.'
    })
  }
}