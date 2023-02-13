const express = require('express');
const app = express();
const port = process.env.port || 3000;

app.get('/',(req , res) => {
    res.send("API Hit by Naghman Oracle Laptop.")
})

app.listen(port , () => {
    console.log('Server is running on Port' + port);
})