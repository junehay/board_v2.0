const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
        title : {type:String, required:true},
        body : {type:String, required:true},
        author : {type:String, required:true},
        createdAt : {type:Date, required:true, default:Date.now },
        views : {type:Number, required:true, default:0}
});

const Post = mongoose.model('post', postSchema);

module.exports = Post;