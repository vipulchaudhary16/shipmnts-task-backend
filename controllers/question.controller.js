const { VOTE_TYPES } = require('../constants');
const questionSchema = require('../schemas/question.schema');

const addQuestion = async (req, res) => {
	try {
		const { question, tags } = req.body;
		const questionBy = req.user.id;
		const newQuestion = new questionSchema({
			question,
			questionBy,
			tags,
		});
		await newQuestion.save();
		res.status(201).send(newQuestion);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

const updateQuestion = async (req, res) => {
	try {
		const { id } = req.params;
		const { question, tags } = req.body;
		const questionBy = req.user.id;
		const findQuestion = await questionSchema.findById(id);
		if (!findQuestion) {
			return res.status(404).send('Question not found');
		}
		if (findQuestion.questionBy.toString() !== questionBy) {
			return res.status(401).send('Unauthorized');
		}
		const UpdatedQuestion = await questionSchema.findByIdAndUpdate(
			id,
			{
				question,
				tags,
			},
			{ new: true }
		);
		res.status(200).json(UpdatedQuestion);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

const deleteQuestion = async (req, res) => {
	try {
		const { id } = req.params;
		const questionBy = req.user.id;
		const findQuestion = await questionSchema.findById(id);
		if (!findQuestion) {
			return res.status(404).send('Question not found');
		}
		if (findQuestion.questionBy.toString() !== questionBy) {
			return res.status(401).send('Unauthorized');
		}
		await questionSchema.findByIdAndDelete(id);
		res.status(200).send('Question deleted');
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

const getQuestions = async (req, res) => {
	try {
		const { q, tags } = req.query;
		const tagsArray = tags.toString().split(',');
		console.log(tagsArray);
		const pipeline = [
			{
				$match: {
					question: {
						$regex: q ?? ' ',
						$options: 'i',
					},
					tags: {
						$in: tagsArray,
					},
				},
			},
			{
				$lookup: {
					from: 'users',
					localField: 'questionBy',
					foreignField: '_id',
					as: 'questionByUser',
				},
			},
			{
				$unwind: '$questionByUser',
			},
			{
				$lookup: {
					from: 'comments',
					localField: '_id',
					foreignField: 'questionId',
					as: 'comments',
				},
			},
			{
				$sort: {
					question: 1,
				},
			},
			{
				$project: {
					_id: 1,
					question: 1,
					votes: 1,
					tags: 1,
					addedAt: 1,
					'questionByUser._id': 1,
					'questionByUser.userName': 1,
					comments: 1,
				},
			},
		];
		const questions = await questionSchema.aggregate(pipeline);
		res.status(200).json(questions);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

const voteQuestion = async (req, res) => {
	try {
		const { id } = req.params;
		const { type } = req.query;
		const questionBy = req.user.id;
		const findQuestion = await questionSchema.findById(id);
		if (!findQuestion) {
			return res.status(404).send('Question not found');
		}
		console.log(findQuestion.questionBy.toString(), questionBy);
		if (findQuestion.questionBy.toString() !== questionBy) {
			return res.status(401).send('Unauthorized');
		}

		if (type == VOTE_TYPES.UPVOTE) {
			await questionSchema.findByIdAndUpdate(id, {
				$inc: { votes: 1 },
			});
		} else if (type == VOTE_TYPES.DOWNVOTE) {
			await questionSchema.findByIdAndUpdate(id, {
				$inc: { votes: -1 },
			});
		}
		res.status(201).send('Vote added');
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

module.exports = {
	addQuestion,
	updateQuestion,
	deleteQuestion,
	getQuestions,
	voteQuestion,
};
