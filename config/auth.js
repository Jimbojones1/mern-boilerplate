const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = function(req, res, next) {
  // Check for the token being sent in three different ways
  let token = req.get('Authorization') || req.query.token || req.body.token;
  if (token) {
    // Remove the 'Bearer ' if it was included in the token header
    token = token.replace('Bearer ', '');
    // Check if token is valid and not expired
    jwt.verify(token, SECRET, function(err, decoded) {
      if (err) {
        req.user = null;
        return next();
      } else {
         // If invalid token, err will be set
    
        return next(); // passes the req object to the next place in the middleware chain!
      }
    });
  } else {
    // not token
    req.user = null;
    next();
  }
};
