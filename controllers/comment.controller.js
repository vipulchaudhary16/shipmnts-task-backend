const commentSchema = require('../schemas/comment.schema');

const addComment = async (req, res) => {
	try {
		const { comment, questionId } = req.body;
		const userId = req.user.id;
		const newComment = new commentSchema({
			comment,
			questionId,
			userId,
		});
		const response = await newComment.save();
		res.status(201).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

const voteComment = async (req, res) => {
	try {
		const { id } = req.params;
		const { type } = req.query;
		const commentBy = req.user.id;
		const findComment = await commentSchema.findById(id);
		if (!findComment) {
			return res.status(404).send('Comment not found');
		}
		if (findComment.userId.toString() !== commentBy) {
			return res.status(401).send('Unauthorized');
		}

		if (type == VOTE_TYPES.UPVOTE) {
			await commentSchema.findByIdAndUpdate(id, {
				$inc: { votes: 1 },
			});
		} else if (type == VOTE_TYPES.DOWNVOTE) {
			await commentSchema.findByIdAndUpdate(id, {
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
	addComment,
	voteComment,
};
