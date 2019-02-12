const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
/* GET home page. */
router.post('/login', (req, res, next) => {
  // mock user
  const user = {
    id: 1,
    username: 'brad',
    email: 'brad@gmail.com'
  }
  jwt.sign({ user: user }, 'secretkey', { expiresIn: '30s' }, (err, token) => {
    res.json({
      token
    })
  });

});

router.post('/signup', (req, res) => {
  res.json({
    message: 'Welcome to the Signup'
  })
})

router.post('/test', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      console.log('no jala')
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Sí verifica el token',
        authData
      })
    }
  })
});

function verifyToken(req, res, next) {
  // get auth header
  const bearerHeader = req.headers['authorization'];
  // check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // split at the space
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    
    req.token = bearerToken;
    console.log('TOKEN: ', req.token)
    next();
  } else {
    // forbidden
    res.sendStatus(403);
  }
}


module.exports = router;
