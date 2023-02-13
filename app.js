const express = require('express');
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

app.post('/user' , (req , res) => {
   res.send("POST API Hit by Naghman.")
});

app.listen(port , () => {
    console.log('Server is running on Port' + port);
})