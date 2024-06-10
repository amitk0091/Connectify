const express = require('express');
const authenticateToken = require('../middleware/AuthenticateToken');
const { loginUser } = require('../services/userAuth');
const router = express.Router();

router.get('',authenticateToken,loginUser)

module.exports = router;