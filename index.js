const express = require('express');
require('dotenv').config();
const cors = require('cors');
const logger = require('morgan');
const app = express();
const PORT = 8080 || process.env.PORT;

app.use(cors());
app.use(express.json());

app.use(logger());

app.get('/api', (req, res) => {
	res.send('API Ok!');
});

app.listen(PORT, () => {
	console.log('Server is running on port ' + PORT);
});
