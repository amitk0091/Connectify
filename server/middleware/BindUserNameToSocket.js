
const jwt = require('jsonwebtoken')


const BindUserNameToSocket = (socket, next) => {
    // const token = socket.handshake.auth.token;
    const cookies = socket.handshake.headers.cookie;
    console.log('Cookies:', cookies);
    // console.log(token)
    // if (!token) {
    //     return next(new Error('Authentication error'));
    // }
    // jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    //     if (err) {
    //         return next(new Error('Authentication error'));
    //     }
    //     socket.username = user.username;
    // });
    next();
}


module.exports = BindUserNameToSocket;