const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username:{
    type: String,
    require: true,
    unique: true
  },
  password:{
    type: String,
    require: true
  },
  type:{
    type: String,
    require: true
  },
  header:{
    type: String
  },
  job:{
    type: String
  },
  salary:{
    type: String
  },
  company:{
    type: String
  },
  info:{
    type: String,
  }
});

const User = mongoose.model('Users', userSchema);

module.exports = User;