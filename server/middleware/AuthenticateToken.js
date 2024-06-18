const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {

    const token = req.cookies.token;
    if (token == null) return res.status(401).json({token: "Token is null"}); // http unauthorised as details are null
    

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        req.user = user;
        if(err) return res.status(401).json({error : "ERR_TOKEN_EXPIRED"});
        next();
    });
}

module.exports = authenticateToken;