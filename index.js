const express = require('express');
require('dotenv').config();
require('./config/db.config').connect();
const cors = require('cors');
const logger = require('morgan');
const app = express();
const PORT = 8080 || process.env.PORT;

app.use(cors());
app.use(express.json());

app.use(logger());

app.get('/', (req, res) => {
	res.send('API Ok!');
});

app.use('/api/user', require('./routes/user.route'));
app.use('/api/question', require('./routes/question.route'));

app.listen(PORT, () => {
	console.log('Server is running on port ' + PORT);
});
