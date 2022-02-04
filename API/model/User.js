const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username:{
		type: String,
		required: true,
		min:6
	},
	password:{
		type: String,
		required: true,
		min:6
	},
	wishlist:[{
		imdbID: String,
		Poster: String,
		Title: String
	}]
});

module.exports = mongoose.model('User', userSchema);