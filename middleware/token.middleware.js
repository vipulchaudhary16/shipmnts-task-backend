const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
	const token = req.header('auth-token');
	if (!token) {
		res.status(401).send('Invalid token');
	}
	try {
		const data = jwt.verify(token, SECRET);
		req.user = data.user;
		next();
	} catch (error) {
		res.status(401).send('Invalid token');
		console.log(error);
	}
};

module.exports = { verifyToken };
