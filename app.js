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

app.get('/', (req, res) => {
   // res.send("Get API Hit by Naghman.")
   console.log("Message for Post API");
   res.json(
      {
         "Name": "Naghman Shafeeque",
         "Email": "naghman.shafique@gmail.com",
         "Password": "welcome123"
      });
});

app.post('/api/signup', (req, res) => {
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
        message: "Error occured in User Signup.",
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