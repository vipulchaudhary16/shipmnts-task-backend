const bcrypt = require('bcrypt');
const userSchema = require('../schemas/user.schema');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const register = async (req, res) => {
	try {
		const { userName, email, password } = req.body;
		const isUserAlreadyExists = await userSchema.findOne({
			$or: [{ email }, { userName: email }],
		});
		if (isUserAlreadyExists != null) {
			return res.status(400).json({ error: 'User Already Exists' });
		}

		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);
		const newUser = new userSchema({
			userName,
			email,
			password: hashedPassword,
		});
		await newUser.save();
		res.status(201).send('User registered!');
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

const login = async (req, res) => {
	try {
		const { email, userName, password } = req.body;
		const user = await userSchema.findOne({
			$or: [{ email }, { userName: email }],
		});
		if (!user) {
			res.status(404).send('User does not exists');
		} else {
			const compareResult = await bcrypt.compare(password, user.password);
			if (!compareResult) {
				res.status(400).json('Wrong credentials');
			} else {
				const payload = {
					user: {
						id: user._id,
					},
				};
				const token = jwt.sign(payload, JWT_SECRET_KEY);
				res.status(200).json({ token });
			}
		}
	} catch (error) {
		res.status(500).send('Internal server error');
		console.log(error);
	}
};

module.exports = {
	register,
	login,
};
