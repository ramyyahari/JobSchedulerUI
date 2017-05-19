
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
	firstName: String,
	lastName: String,
 	email: { type: String, unique:true}, 
 	password: String,
 	type: String
 	 
});

var User = mongoose.model('User', UsersSchema);

module.exports = User;