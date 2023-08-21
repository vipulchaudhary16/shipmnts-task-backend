const express = require('express');
const { verifyToken } = require('../middleware/token.middleware');
const {
	addQuestion,
	updateQuestion,
  deleteQuestion,
} = require('../controllers/question.controller');
const router = express.Router();

router.use(verifyToken);
router.post('/add', addQuestion);
router.put('/update/:id', updateQuestion);
router.delete('/delete/:id', deleteQuestion)
module.exports = router;
