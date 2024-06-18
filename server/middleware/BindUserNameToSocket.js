
const jwt = require('jsonwebtoken')


const BindUserNameToSocket = (socket, next) => {
    if(socket.handshake.headers.cookie=== undefined) {
        return next(new Error('Authentication error'));
    }
    
    const token = (socket.handshake.headers.cookie).split('=')[1];
    
    if (!token) {
        return next(new Error('Authentication error'));
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return next(new Error('Authentication error'));
        }
        socket.user = user;
        next();
    });
}


module.exports = BindUserNameToSocket;