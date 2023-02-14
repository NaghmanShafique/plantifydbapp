const express = require('express');
const mongoose = require('mongoose');
const userModel = require('./model/userSchema');
const cors = require('cors');

const app = express();
const port = process.env.port || 5000;
require('dotenv').config();

mongoose
   .connect(process.env.MONGO_URI)
   .then((res) => console.log("mongoDb Connect"))
   .catch((err) => console.log(err, "error"));


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  
   console.log("Message for Post API");
   res.json(
      {
         "Name": "Naghman Shafeeque",
         "Email": "naghman.shafique@gmail.com",
         "Password": "welcome123"
      });
});

app.post('/api/signup' ,(req, res) => {
   console.log("Body" + req.body);

   const { email, password } = req.body;

   if (!email || !password) {
      res.json({ message: "Input required in mandatory Fields." });
      return;
   }

   const signUpObj = {
      email,
      password
   };
   
   userModel.findOne({ email }, (err, user) => {
     if (err) {
        console.log(err, "error");
        res.json({
        message: "Error occured in User Signup."+err,
       });
     } else {
        console.log(user, "user");
         if (user) {
           res.json({ message: "Email already exists." });
         } else {
            userModel.create(signUpObj, (error, data) => {
              if (error) {
                console.log("Post API Error" + error);
                res.send("error", error)
              } else {
                  res.json({
                  message: 'User sucessfully created.',
                  data
               })
            }
         })
      }
   }
 })
});


app.post('/api/signin', (req , res) => {
   
   const { email, password } = req.body;
   console.log(`Email and passowrd ${email} and ${password}`);
   if (!email || !password) {
      res.json({ message: "Input Fields required." });
      return;
   }

   userModel.findOne({ email } , (err , user) => {
      if(err) {
         console.log(err, "error");
         res.json({
         message: "Error occured in User Signin.",
        });
      } else {
         if(user) {
            if (password === user.password) {
               res.json({
                  message: "user successfully login",
                  data: user
               });
            } else {
               res.json({
                 message: "Invalid credential error!",
               });
            }
      } else {
         res.json({
           message: "Invalid credential error!",
         });
      }
    }  
  });
})

app.listen(port, () => {
   console.log('Server is running on Port' + port);
});