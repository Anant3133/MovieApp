const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

console.log('signup is a:', typeof signup);  
console.log('login is a:', typeof login);    

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
