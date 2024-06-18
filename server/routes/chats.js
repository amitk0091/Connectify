const express = require('express');
const authenticateToken = require('../middleware/AuthenticateToken');
const ChatRoom = require('../models/chatRoom');
const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
    const rooms = await ChatRoom.find({ users: req.user.id })
        .populate('messages');
    res.json(rooms);
})

module.exports = router;