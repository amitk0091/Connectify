const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/AuthenticateToken');

router.get('/', authenticateToken, async (req, res) => {
    const contacts = await User.findOne({ username: req.user.username }, { contacts: 1 });
    res.status(200).json(contacts);
})



router.post('/', authenticateToken, async (req, res) => {
    const { user_email } = req.body;
    const existingUser = await User.findOne({ $or: [{ email: user_email }, { username: user_email }] }, { username: 1, email: 1, name: 1, about: 1, profilePic: 1, CoverPic: 1, phoneNumber: 1 , isOnline: 1});

    if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });  // HTTP Resource Not Found
    }
    await User.UpdateOne({ email: req.user.email }, { $push: { contacts: existingUser._id }});
    return res.status(200).json(existingUser);
})

module.exports = router