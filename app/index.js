const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
const search = require('/app/search.js');
const { timeFilter } = require('/app/filters.js')

const app = express();

app.use(cors());

app.get('/search', async function(req, res) {
	const { _id, sy, sm, sd, ey, em, ed, ry, rm, rd } = req.query;

	let idfilter = _id ? { _id: new ObjectId(_id) } : {};
	let timefilter = await timeFilter(sy, sm, sd, ey, em, ed, ry, rm, rd);

	filter = { ...idfilter, ...timefilter };

	let result = await search(filter);
	res.send(result);
});

 app.use(function(req, res) {
    res.status(404).send('Not found');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
