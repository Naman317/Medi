const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(" ")[1];
    console.log(`Received token: ${token}`);
    jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
      if (err) {
        console.log(`Error verifying token: ${err.message}`);
        return res.status(401).send({ // Changed to 401 Unauthorized
          message: 'Auth Fail',
          success: false
        })
      } else {
        req.body.userId = decode.id
        next()
      }
    })
  } catch (error) {
    console.log(err)
    return res.status(401).send({ // Changed to 401 Unauthorized
      message: 'Auth Fail',
      success: false
    })
  }
};