const express = require('express');
const { verifyToken } = require('../middleware/token.middleware');
const {
	addQuestion,
	updateQuestion,
	deleteQuestion,
	getQuestions,
	voteQuestion,
} = require('../controllers/question.controller');
const router = express.Router();

router.use(verifyToken);
router.post('/add', addQuestion);
router.put('/update/:id', updateQuestion);
router.delete('/delete/:id', deleteQuestion);
router.get('/all-questions', getQuestions);
router.put('/vote/:id', voteQuestion);

module.exports = router;
