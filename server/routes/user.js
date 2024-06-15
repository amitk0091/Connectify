const express = require('express');

const router = express.Router();

const { addUser, getUser, deleteUser, updateUser } = require('../services/userAuth');
const authenticateToken = require('../middleware/AuthenticateToken');


router.post('',addUser);
router.get('',authenticateToken,getUser);
router.delete('',authenticateToken,deleteUser);
router.patch('',authenticateToken,updateUser);


module.exports = router;