const express = require('express');
const {config} = require('dotenv')


// config({path : './utils/.env'} );
config();

const PORT = process.env.PORT || 3000   ;

const app = express();

// for receiveing json body
app.use(express.json());

// for receiving application/x-www-form-urlencoded
app.use(express.urlencoded({extended : true}))


const service1Routes = require('./routes/Service1Routes')
app.use('/service1', service1Routes)
app.use('/chat', service1Routes)
// chat video auth status

// app.use('/service2', )
// app.use('/service3', )

// port , callback function
app.listen(PORT, () =>{
    console.log(`app is listening at ${PORT} `);
});