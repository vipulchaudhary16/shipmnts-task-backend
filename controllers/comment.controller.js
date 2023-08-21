const commentSchema = require("../schemas/comment.schema");

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

module.exports = {
	addComment,
};
