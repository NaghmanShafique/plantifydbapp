const express = require('express');
const mongoose = require('mongoose');
const userModel = require('./model/userSchema');
const cors = require('cors');
const app = express();
const port = process.env.port || 5000;

// const baseUri = 'mongodb+srv://naghman:nnsamaasz@cluster0.udjyj5a.mongodb.net/mobile-DB'
   const baseUri = 'mongodb+srv://plantifydb:plantifydb123@cluster0.2m4sxxs.mongodb.net/mobile-DB'

mongoose
  .connect(baseUri)
  .then((res) => console.log("mongoDb Connect"))
  .catch((err) => console.log(err, "error"));
  

app.use(express.json());
app.use(cors());

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
        console.log("Post API Error"+error);
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