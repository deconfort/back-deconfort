const mongoose = require('mongoose')

const schema = new mongoose.Schema({
     userId: { type:  mongoose.Types.ObjectId, 
     ref: 'users', required:true},
     comment: { type: String, required: true, required:true },
     date: {type: Date, required:true},
     photo: {type: String},
     reports: [{ type: mongoose.Types.ObjectId, ref: "users"}],
})


const Comment = mongoose.model('comments', schema);
module.exports = Comment;