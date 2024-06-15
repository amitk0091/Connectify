const User = require('../models/user')
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');


const loginUser = async (req, res) => {
    if (req.user) {
        return res.status(200).json({ user: req.user });
    }
    const { user_email,password } = req.body;
    try {
        const user = await User.findOne({
            $or: [{ email: user_email }, { username: user_email }]
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });  // HTTP Resource Not Found
        }

        const storedHash = user.password;
        const match = await bcrypt.compare(password, storedHash);

        if (match) {
            const token = generateToken(user);
            delete user.password;
            return res.status(200).cookie('token', token, {
                expires: new Date(Date.now() + 900000),
                httpOnly: true,
            }).json({ user });  // HTTP Success
        } else {
            return res.status(401).json({ message: 'Password does not match' });  // HTTP Unauthorized
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });  // HTTP Server Error
    }
}

const addUser = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });
        if (existingUser) {
            return res.status(409).json({ message: 'Email/Username already in use' });  // http conflicting
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, password: hashedPassword, email });
        await newUser.save();
        const token = generateToken(newUser);
        delete newUser.password;
        return res.status(201).cookie('token', token, {
            expires: new Date(Date.now() + 900000),
            httpOnly:true,
            sameSite : none
        }).json({ newUser }); // http created 

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error', error: error.message });  // server error
    }
}

const deleteUser = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        let user;
        if (email) {
            user = await User.findOne({ email }, { password: 1 });
        } else if (username) {
            user = await User.findOne({ username }, { password: 1 });
        } else {
            return res.status(400).json({ message: 'Name or email is required'}); // HTTP Bad Request
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // HTTP Resource Not Found
        }

        const storedHash = user.password;

        const match = await bcrypt.compare(password, storedHash);

        if (match) {
            if (email) {
                await User.deleteOne({ email });
            } else if (username) {
                await User.deleteOne({ username, password });
            }
            return res.status(200).json({ message: 'User Deleted Successfully!' }); // HTTP Success
        } else {
            return res.status(401).json({ message: 'Password does not match' }); // HTTP Unauthorized
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message }); // HTTP Server Error
    }
};

const updateUser = async (req, res) => {
    const { username, newUser, password, email, newPassword, newEmail } = req.body;

    try {
        let user;
        if (username) {
            user = await User.findOne({ username }, { "password": 1 });
        } else if (email) {
            user = await User.findOne({ email }, { "password": 1 });
        } else {
            return res.status(400).json({ message: 'Name or email is required' }); // HTTP Bad Request
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // HTTP Resource Not Found
        }

        const storedHash = user.password;

        const match = await bcrypt.compare(password, storedHash);

        if (match) {
            // Prepare update object
            const updateData = {};
            if (newUser) updateData.username = newUser;
            if (newEmail) updateData.email = newEmail;
            if (newPassword) {
                const salt = await bcrypt.genSalt(10);
                updateData.password = await bcrypt.hash(newPassword, salt);
            }

            // Update user details
            const updatedUser = await User.findByIdAndUpdate(user._id, updateData, { new: true });

            return res.status(200).json({ message: 'User updated successfully', user: updatedUser }); // HTTP Success
        } else {
            return res.status(401).json({ message: 'Password does not match' }); // HTTP Unauthorized
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message }); // HTTP Server Error
    }
};

const getUser = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        let user;
        if (email) {
            user = await User.findOne({ email }, { password: 1 });
        } else if (username) {
            user = await User.findOne({ username }, { password: 1 });
        } else {
            return res.status(400).json({ message: 'Name or email is required' }); // http  bad request 
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });  // http resource not found
        }

        const storedHash = user.password;

        const match = await bcrypt.compare(password, storedHash);

        if (match) {
            res.status(200).json({ message: 'Password matches!' });  // http success
        } else {
            res.status(401).json({ message: 'Password does not match' });  // http unauthorised
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });  // server error
    }
};



module.exports = { addUser, deleteUser, updateUser, getUser, loginUser };