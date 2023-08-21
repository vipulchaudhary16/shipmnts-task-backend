const express = require('express');
const { verifyToken } = require('../middleware/token.middleware');
const { addComment } = require('../controllers/comment.controller');
const router = express.Router();

router.use(verifyToken);
router.post('/add', addComment)

module.exports = router
