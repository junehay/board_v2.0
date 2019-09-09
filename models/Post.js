const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const postSchema = mongoose.Schema({
        number : {type:Number, required:true},
        title : {type:String, required:true},
        body : {type:String, required:true},
        author : {type:String, required:true},
        createdAt : {type:Date, required:true, default:Date.now },
        views : {type:Number, required:true, default:0}
});

postSchema.plugin(mongoosePaginate);

const Post = mongoose.model('post', postSchema);

Post.paginate().then({})

module.exports = Post;