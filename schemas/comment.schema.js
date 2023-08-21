const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
	comment: {
		type: String,
		required: true,
	},
	questionId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Question',
		required: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	votes: {
		type: Number,
		default: 0,
	},
	addedAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Comment', Comment);
