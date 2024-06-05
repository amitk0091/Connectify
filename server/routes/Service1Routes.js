const express = require('express');

const router = express.Router();

const controller1 = require('../controllers/controller1');

router.get('',controller1)


// router.get('',(req,res)=>{
//     res.send("well")
// })

// console.log(req.params);
// console.log(req.query);
// console.log(req.body);

router.post('/:id',(req,res) =>{
    res.send("Welcome")
})

module.exports = router ;