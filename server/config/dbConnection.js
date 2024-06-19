const mongoose = require('mongoose');

const connectDB =async () =>{
    try{
        const connect =await mongoose.connect(process.env.CONNECTION_STRING);
        // console.log("Database connected ");
    }
    catch(error){
        // console.log("Connection failed due to Network error or MONGO_error", error.code);
        process.exit(1);
    }
}

module.exports = connectDB;