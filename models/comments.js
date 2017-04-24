
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentsSchema = new Schema({
	title: String,
	date: Date,
 	content: String,
 	username: String,
 	// files: String 
});

var Comment = mongoose.model('Comment', CommentsSchema);

module.exports = Comment;