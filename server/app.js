const express = require('express');
const {config} = require('dotenv')
const cookieParser = require('cookie-parser')
const userModel = require('./models/user')
const cors = require('cors');

// config({path : './utils/.env'} );
config();

const PORT = process.env.PORT || 3000   ;

const app = express();

// for receiveing json body
app.use(express.json());

app.use(cookieParser());

app.use(cors())

// for receiving application/x-www-form-urlencoded
app.use(express.urlencoded({extended : true}))


app.post('/create', async (req,res)=>{
let {name , password , phoneNumber } = req.body ;
console.log(req.body);
  let createdUsers = await userModel.create({
     name ,
     password ,
     phoneNumber 
  })
  res.send(createdUsers);
  
})

const service1Routes = require('./routes/Service1Routes')
// app.use('/create' , createRoutes)
app.use('/service1', service1Routes)
app.use('/chat', service1Routes)
// chat video auth status

// app.use('/service2', )
// app.use('/service3', )

// port , callback function
app.listen(PORT, () =>{
    console.log(`app is listening at ${PORT} `);
});