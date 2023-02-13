const express = require('express');
const app = express();
const port = process.env.port || 3000;

app.get('/',(req , res) => {
    res.send("Get API Hit by Naghman.")
});

app.post('/user' , (req , req) => {
    res.send('POST API Hit by Naghman.')
});

app.listen(port , () => {
    console.log('Server is running on Port' + port);
})