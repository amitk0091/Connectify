const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // http unauthorised as details are null

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);  //http forbidden Unauthorised as 401  but here server knows details of user
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;