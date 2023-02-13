const mongoose = require('mongoose');
const schema  = mongoose.Schema({
     email: {
        type: String
       },
      password : {
        type: String
      },
})

const userModel = mongoose.model('user',schema);
module.exports = userModel;