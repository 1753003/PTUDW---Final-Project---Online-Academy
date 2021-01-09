const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  //if guest
  // open some api
  //here
  const link = req.protocol + '://' + req.get('host') + req.originalUrl
  const accessToken = req.headers['x-access-token'];
  const aToken = req.headers['Cookie'];
  if(req.method == "POST" && req.originalUrl =='/api/user'){
    next()
  }
  else if(req.method == "GET" && req.originalUrl.includes('/api/user')){
    next()
  }
  else if(accessToken == 'undefined' || accessToken == undefined){
    if(req.method == "GET" && link.includes('course')){
      console.log('course no token', link );
      next()
    }
    if(req.method == "GET" && link.includes('category')){
      console.log('category no token', link);
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
    if(req.method == "POST" && link.includes('changePasswordWithEmail')) {
      console.log('GUEST', req.method);
      next()
    }
  }
  else if (accessToken) {
    console.log(link)
    try {
      // console.log('wat', req.method );
      const decoded = jwt.verify(accessToken, 'SECRET_KEY');
      req.accessTokenPayload = decoded;
      console.log(' success')
    } catch (err) {
      // console.log(err);
      // if(req.method == "GET"){
      //   console.log('get', err);
      //   // next()
      // }else
      // console.log('guest', req.method );
      console.log(' fialed')
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