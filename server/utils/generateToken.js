const jwt = require('jsonwebtoken');


function generateToken(user) {
    return jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
}

module.exports = generateToken;