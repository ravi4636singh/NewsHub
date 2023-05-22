require('dotenv').config();
const express = require('express');
const axios = require('axios');
const ejs = require('ejs');

const app = express();
const PORT = process.env.PORT || 3050;

app.listen(PORT, () => console.log(`Server is running on PORT : ${PORT}`));

app.set('view engine', 'ejs');
app.set('views', './public');
app.use(express.static('public'));

// Home Page Route
app.get('/', async (req, res) => {
	try {
		const response = await axios.get(
			`https://inshorts.deta.dev/news?category=all`
		);
		const data = response.data;

		if (response.status === 200) {
			res.status(200).render('index', { data });
		}
	} catch (err) {
		console.error(err.message);
	}
});

// Category Page Route
app.get('/:category', async (req, res) => {
	try {
		const response = await axios.get(
			`https://inshorts.deta.dev/news?category=${req.params.category}`
		);
		const data = await response.data;

		if (response.status === 200) {
			res.status(200).render('index', { data });
		}
	} catch (err) {
		console.error(err.message);
	}
});

// Page Not Found
app.get('/:category/:notFound', (req, res) => {
	res.status(404).render('error-page');
});
