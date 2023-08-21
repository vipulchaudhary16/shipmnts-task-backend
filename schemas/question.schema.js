const mongoose = require('mongoose');

const Question = new mongoose.Schema({
	question: {
		type: String,
		required: true,
	},
	questionBy: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
	},
	votes: {
		type: Number,
		default: 0,
	},
	tags: {
		type: Array,
		default: [],
	},
	addedAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Question', Question);
