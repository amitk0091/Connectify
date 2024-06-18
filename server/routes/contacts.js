const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/AuthenticateToken');
const User = require('../models/user');

router.get('/', authenticateToken, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.username }).populate('contacts', 'username email name isOnline phoneNumber'); // Adjust the fields as needed
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(user.contacts);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


router.post('/', authenticateToken, async (req, res) => {
    const { user_email } = req.body;
    const existingUser = await User.findOne({ $or: [{ email: user_email }, { username: user_email }] }, { username: 1, email: 1, name: 1, about: 1, profilePic: 1, CoverPic: 1, phoneNumber: 1, isOnline: 1 });

    if (!existingUser) {
        return res.status(404).json({ message: 'User is not using connectify' });  // HTTP Resource Not Found
    }
    if(req.user.username === existingUser.username){
        return res.status(400).json({ message: 'You cannot add yourself' });  // http bad request
    }
    await User.updateOne(
        { email: req.user.email },
        { $addToSet: { contacts: existingUser._id } }
    );
    return res.status(200).json(existingUser);
})

module.exports = router