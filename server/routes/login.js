const express = require('express');
const authenticateToken = require('../middleware/AuthenticateToken');
const { loginUser } = require('../services/userAuth');
const router = express.Router();

router.post('',loginUser)

module.exports = router;