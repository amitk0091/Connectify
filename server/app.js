const express = require('express');
const {config} = require('dotenv')
const cookieParser = require('cookie-parser')
const userModel = require('./models/user')
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
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


app.post('/create', (req,res)=>{
let {name , password , phoneNumber } = req.body ;
bcrypt.genSalt(10,(err,salt)=>{
 bcrypt.hash(password,salt,async (err,hash)=>{
 let createdUsers = await userModel.create({
     name ,
     password: hash,
     phoneNumber 
  })

  let token = jwt.sign({name},"shhshhshhshhhshhshhs");
  res.cookie("token" , token);
  res.send(createdUsers);
 })
})
  
  
})

app.post('/logout',(req,res)=>{
  res.cookie("token","");
  res.redirect('/');
})

app.post('/login', async (req,res)=>{
 let user = await userModel.findOne({name: req.body.name});
 console.log(user);
 if (!user) {
  return res.send('Name is required');
}
bcrypt.compare(req.body.password , user.password , (err,result)=>{
  if(result) {
    let token = jwt.sign({name: user.name},"shhshhshhshhhshhshhs");
    res.cookie("token" , token);
    return res.redirect('/');
  }
  else alert('Wrong Password');
})
} )








// const service1Routes = require('./routes/Service1Routes')
// // app.use('/create' , createRoutes)
// app.use('/service1', service1Routes)
// app.use('/chat', service1Routes)
// // chat video auth status

// // app.use('/service2', )
// // app.use('/service3', )

// // port , callback function
app.listen(PORT, () =>{
    console.log(`app is listening at ${PORT} `);
});