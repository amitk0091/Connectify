const express = require('express');
const authenticateToken = require('../middleware/AuthenticateToken');
const { loginUser } = require('../services/userAuth');
const router = express.Router();

router.post('',authenticateToken,loginUser)

module.exports = router;