const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userid:{type:String,
            required:true,
            unique:true,
            match:[/^.{4,12}$/,"Should be 4-12 characters!"],
            trim:true},
    password:{type:String,
              required:true,},
    name:{type:String,
          required:true}
});

const User = mongoose.model('user', userSchema);

module.exports = User;