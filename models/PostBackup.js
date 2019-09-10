const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
        number : {type:Number, required:true},
        title : {type:String, required:true},
        body : {type:String, required:true},
        author : {type:String, required:true},
        createdAt : {type:Date, required:true, default:Date.now },
        views : {type:Number, required:true, default:0}
});

const PostBackup = mongoose.model('postbackup', postSchema);


module.exports = PostBackup;