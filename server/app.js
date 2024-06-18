const express = require('express');
const http = require('http');
const { config } = require('dotenv');
const cors = require('cors');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/dbConnection');
const BindUserNameToSocket = require('./middleware/BindUserNameToSocket');
// const errorHandler = require('./utils/errorHandler');
// const logger = require('./utils/logger');
const User = require('./models/user');
const Message = require('./models/message');
const ChatRoom = require('./models/chatRoom');

// Import routes
const userRoute = require('./routes/user');
const loginRoute = require('./routes/login');
const contactsRoute = require('./routes/contacts');
const chatRoute = require('./routes/chats');

// Initialize configurations
config();
connectDB();

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/login', loginRoute);
app.use('/users', userRoute);
app.use('/contacts', contactsRoute);
app.use('/chats', chatRoute);

// Error handling middleware
// app.use(errorHandler);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"],
        credentials: true,
    }
});

io.use(BindUserNameToSocket);

io.on('connection', async (socket) => {
    try {
        console.log('A user connected', socket.user.username);

        const user = await User.findOneAndUpdate({ "_id": socket.user.id }, { $set: { isOnline: true, socketId : socket.id } });
        socket.broadcast.emit('userOnline', socket.user.id);
        
        socket.on('joinRoom', async (obj) => {
            try {
                if (!obj || !obj.user1 || !obj.user2) {
                    console.error('Invalid user data');
                    return;
                }

                const { user1, user2 } = obj;
                let room = await ChatRoom.findOne({ users: { $all: [user1.id, user2.id] } });

                if (!room) {
                    room = new ChatRoom({
                        name: `${user1.username} & ${user2.username}`,
                        users: [user1.id, user2.id]
                    });
                    await room.save();
                }

                socket.join(room._id.toString());
                console.log(`${user2.username} joined, room ${room._id.toString()}`);
            } catch (error) {
                console.error('Error joining room:', error);
            }
        });

        socket.on('sendMessage', async (message) => {
            try {
                const newMessage = new Message(message);
                await newMessage.save();

                const room = await ChatRoom.findOneAndUpdate(
                    { users: { $all: [message.sender, message.receiver] } },
                    { $push: { messages: newMessage._id } },
                    { new: true }
                );
                const receiver= await User.findOne({_id : message.receiver},{socketId: 1, _id : 0});
                if (room) {
                    io.to(receiver.socketId).emit('newMessage', newMessage);
                    console.log("Message sent to room", receiver.socketId);
                } else {
                    console.error('Room not found for message');
                }
            } catch (error) {
                console.error('Error sending message:', error);
            }
        });

        socket.on('disconnect', async () => {
            try {
                console.log('A user disconnected', socket.user.username);

                if (socket.user) {
                    await User.findByIdAndUpdate(socket.user.id, { isOnline: false });
                    socket.broadcast.emit('userOffline', socket.user.id);
                }
            } catch (error) {
                console.error('Error during disconnect:', error);
            }
        });
    } catch (error) {
        console.error('Error on connection:', error);
    }
});

// Start server
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});




    // // Handle deleting a message for sender
    // socket.on('deleteMessageForSender', async ({ messageId }) => {
    //     const message = await Message.findById(messageId);
    //     if (message) {
    //         message.deletedForSender = true;
    //         await message.save();
    //         io.to(message.sender.toString()).emit('messageDeleted', { messageId, scope: 'sender' });
    //     }
    // });

    // // Handle deleting a message for receiver
    // socket.on('deleteMessageForReceiver', async ({ messageId }) => {
    //     const message = await Message.findById(messageId);
    //     if (message) {
    //         message.deletedForReceiver = true;
    //         await message.save();
    //         io.to(message.receiver.toString()).emit('messageDeleted', { messageId, scope: 'receiver' });
    //     }
    // });

    // // Handle deleting a message for everyone
    // socket.on('deleteMessageForEveryone', async ({ messageId }) => {
    //     const message = await Message.findById(messageId);
    //     if (message) {
    //         message.deletedForEveryone = true;
    //         message.content = 'This message has been deleted';
    //         await message.save();
    //         io.to(message.sender.toString()).emit('messageDeleted', { messageId, scope: 'everyone' });
    //         io.to(message.receiver.toString()).emit('messageDeleted', { messageId, scope: 'everyone' });
    //     }
    // });