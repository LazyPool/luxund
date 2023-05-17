const express = require('express');
const search = require('/app/search.js');
const { timeFilter } = require('/app/filters.js')

const app = express();

app.get('/search', async function(req, res) {
	const { sy, sm, sd, ey, em, ed, ry, rm, rd } = req.query;

	let filter = await timeFilter(sy, sm, sd, ey, em, ed, ry, rm, rd);

	let result = await search(filter);
	res.send(result);
});

 app.use(function(req, res) {
    res.status(404).send('Not found');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
