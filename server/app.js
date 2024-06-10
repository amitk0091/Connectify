const express = require('express');
const http = require('http')
const {config} = require('dotenv')
const cors = require('cors');
const connectDB = require('./config/dbConnection')
const userRoute = require('./routes/user')
const loginRoute = require('./routes/login')
const bodyParser = require('body-parser')


config();
connectDB();

const PORT = process.env.PORT || 3000   ;

const app = express();
const server = http.createServer(app)

// for receiveing json body
app.use(express.json());
app.use(cors())
app.use(bodyParser.json());

// for receiving application/x-www-form-urlencoded
app.use(express.urlencoded({extended : true}))
app.use('/login',loginRoute);
app.use('/users',userRoute)



// port , callback function
app.listen(PORT, () =>{
    console.log(`app is listening at ${PORT} `);
});