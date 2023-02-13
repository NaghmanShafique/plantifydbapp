const mongoose = require('mongoose');
const schema  = mongoose.model({
     email: {
        type: String,
        required : true,
        unique: true
      },
      password : {
        type: String,
        required : true,
      },
})

const userModel = mongoose.model('users',schema);
module.exports = userModel;