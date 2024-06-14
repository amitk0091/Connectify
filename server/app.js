const express = require('express');
const http = require('http')
const { config } = require('dotenv')
const cors = require('cors');
const connectDB = require('./config/dbConnection')
const { Server } = require('socket.io')
const cookieParser = require('cookie-parser');

const BindUserNameToSocket = require('./middleware/BindUserNameToSocket');

// import routes
const userRoute = require('./routes/user')
const loginRoute = require('./routes/login')
const contactsRoute = require('./routes/contacts')
const chatRoute = require('./routes/chats')

config();
connectDB();

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app)

// middleware parsers 
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    credentials: true
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your frontend's URL
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(express.json()); // for receiveing json body
app.use(express.urlencoded({ extended: true }))  // for receiving application/x-www-form-urlencoded
app.use(cookieParser());


//handle routes
app.use('/login', loginRoute);
app.use('/users', userRoute)
app.use('/contacts', contactsRoute);
app.use('/chats',chatRoute);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
        optionsSuccessStatus: 200
    }
});

io.use(BindUserNameToSocket);

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle user joining a chat room
    socket.on('joinRoom', async ({ roomId, userId }) => {
        const room = await ChatRoom.findById(roomId);
        if (room) {
            socket.join(roomId);
            if (!room.users.includes(userId)) {
                room.users.push(userId);
                await room.save();
            }
            await User.findByIdAndUpdate(userId, { online: true });

            // Notify other users in the room about the user's online status
            socket.to(roomId).emit('userOnline', { userId });
        }
    });

    // Handle sending a message
    socket.on('sendMessage', async ({ roomId, message }) => {
        const newMessage = new Message(message);
        await newMessage.save();
        const room = await ChatRoom.findById(roomId);
        if (room) {
            room.messages.push(newMessage._id);
            await room.save();
            io.to(roomId).emit('message', newMessage);
        }
    });

    // Handle deleting a message for sender
    socket.on('deleteMessageForSender', async ({ messageId }) => {
        const message = await Message.findById(messageId);
        if (message) {
            message.deletedForSender = true;
            await message.save();
            io.to(message.sender.toString()).emit('messageDeleted', { messageId, scope: 'sender' });
        }
    });

    // Handle deleting a message for receiver
    socket.on('deleteMessageForReceiver', async ({ messageId }) => {
        const message = await Message.findById(messageId);
        if (message) {
            message.deletedForReceiver = true;
            await message.save();
            io.to(message.receiver.toString()).emit('messageDeleted', { messageId, scope: 'receiver' });
        }
    });

    // Handle deleting a message for everyone
    socket.on('deleteMessageForEveryone', async ({ messageId }) => {
        const message = await Message.findById(messageId);
        if (message) {
            message.deletedForEveryone = true;
            message.content = 'This message has been deleted';
            await message.save();
            io.to(message.sender.toString()).emit('messageDeleted', { messageId, scope: 'everyone' });
            io.to(message.receiver.toString()).emit('messageDeleted', { messageId, scope: 'everyone' });
        }
    });

    socket.on('disconnect', async (socket) => {
        console.log('A user disconnected');

        // Assuming socket.userId is set when the user joins a room
        if (socket.userId) {
            await User.findByIdAndUpdate(socket.userId, { online: false });

            // Notify other users in the room about the user's offline status
            const rooms = await ChatRoom.find({ users: socket.userId });
            rooms.forEach(room => {
                socket.to(room._id).emit('userOffline', { userId: socket.userId });
            });
        }
    });
    
});

// port , callback function
server.listen(PORT, () => {
    console.log(`app is listening at ${PORT} `);
});