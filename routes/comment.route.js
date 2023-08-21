const express = require('express');
const { verifyToken } = require('../middleware/token.middleware');
const {
	addComment,
	voteComment,
} = require('../controllers/comment.controller');
const router = express.Router();

router.use(verifyToken);
router.post('/add', addComment);
router.put('/vote/:id', voteComment);

module.exports = router;
