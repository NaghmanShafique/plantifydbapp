const express = require('express');
const mongoose = require('mongoose');
const userModel = require('./model/userSchema');
const cors = require('cors');
const app = express();
const port = process.env.port || 3000;

app.get('/',(req , res) => {
    // res.send("Get API Hit by Naghman.")
    console.log("Message for Post API");
    res.json(  
             { "Name": "Naghman Shafeeque",
               "Email" : "naghman.shafique@gmail.com",
             "Password" : "welcome123" });
});

app.post('/api/user' , (req , res) => {
   console.log("Body" + req.body);
   userModel.create(req.body , (error , data) => {
     if(error){
        res.send("error",error)
     } else {
        res.json({
            message : 'User sucessfully created.',
            data
        })
     }
   })
});

app.listen(port , () => {
    console.log('Server is running on Port' + port);
})