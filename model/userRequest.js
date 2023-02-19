const mongoose = require('mongoose');
const schema  = mongoose.Schema({
  email: {
    type: String
   },
  phone : {
    type: String
  },  
  latitude: {
    type : String
  },
  longitude : {
    type : String
  },
  comments : {
    type : String
  }
})

const requestModel = mongoose.model('Request',schema);
module.exports = requestModel;