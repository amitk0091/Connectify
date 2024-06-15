const express = require('express');
const authenticateToken = require('../middleware/AuthenticateToken');
const ChatRoom = require('../models/chatRoom');
const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
    ChatRoom.find().populate(users).exec((err, rooms) => {
        console.log(rooms);
        req.json({message : "success"});
    });
})

module.exports = router;