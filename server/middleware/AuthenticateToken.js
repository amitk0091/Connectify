const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {

    const token = req.cookies.token;
    if (token == null) return next(); // http unauthorised as details are null

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;