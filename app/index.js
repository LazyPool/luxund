const express = require('express');
const search = require('/app/search.js');
const { idGen, timeGen, posGen, chrGen, whrGen, itemGen, affrGen } = require('/app/filters.js')

const app = express();

app.get('/search', async function(req, res) {
	const { id, sy, sm, sd, ey, em, ed, ry, rm, rd, pos, chr, whr, item, affr } = req.query;

	let idFilter	= await idGen(id);
	let timeFilter	= await timeGen(sy, sm, sd, ey, em, ed, ry, rm, rd);
	let posFilter	= await posGen(pos);
	let chrFilter   = await chrGen(chr);
	let whrFilter   = await whrGen(whr);
	let itemFilter  = await itemGen(item);
	let affrFilter  = await affrGen(affr);

	let filter = { ...idFilter, ...timeFilter, ...posFilter, ...chrFilter, ...whrFilter, ...itemFilter, ...affrFilter };
	let result = await search(filter);

	res.send(result);
});

 app.use(function(req, res) {
    res.status(404).send('Not found');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
