const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
/* GET home page. */
router.get('/', (req, res, next) => {
  res.json({
    message: 'Welcome to the API'
  })
});

router.post('/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Sí verifica el token',
        authData
      })
    }
  })
});

//format of token
// Authorization: Bearer <access_token>

function verifyToken(req, res, next) {
  // get auth header
  const bearerHeader = req.headers['authorization'];
  console.log(bearerHeader)
  // check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // split at the space
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    console.log(bearerToken)
    req.token = bearerToken;
    next();
  } else {
    // forbidden
    res.sendStatus(403);
  }
}

module.exports = router;
