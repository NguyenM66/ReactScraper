const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
	rank:{
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	},
	points: {
		type: Number,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	saved: {
		type: Boolean,
		required: true,
		default: false
	},
	note: [{
		type: Schema.Types.ObjectId,
		ref: "Note"
	}]
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
