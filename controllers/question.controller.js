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
		res.status(200).send(newQuestion);
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

module.exports = { addQuestion, updateQuestion, deleteQuestion };
