const mongoose = require('mongoose');

const PostNumSchema = mongoose.Schema({
    title : {type:String, required:true},
    number : {type:Number, required:true}
});

const PostNum = mongoose.model('postNum', PostNumSchema);

module.exports = PostNum;