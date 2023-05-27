const express	= require("express");
const cors		= require("cors");
const bodyParser = require("body-parser");
const search	= require("/app/search.js");
const { singleVar, doubleVar, numByDate, mapTree } = require("/app/statistic.js");
const { idGen, timeGen, posGen, chrGen, whrGen, itemGen, affrGen } = require("/app/filters.js");

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.get("/search", async function(req, res) {
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

app.post("/search", async function(req, res) {
	let filter = req.body;

	let result = await search(filter);

	res.send(result);
});

app.get("/statistic", async function(req, res) {
	const { sy, sm, sd, ey, em, ed, tar, lbl, val, num, mode } = req.query;

	let timeFilter	= await timeGen(sy, sm, sd, ey, em, ed);
	let limitFilter = {};

	switch (lbl) {
	case "pos":
		limitFilter = await posGen(val);
		break;
	case "chr":
		limitFilter = await chrGen(val);
		break;
	case "whr":
		limitFilter = await whrGen(val);
		break;
	case "item":
		limitFilter = await itemGen(val);
		break;
	case "affr":
		limitFilter = await affrGen(val);
		break;
	}

	let limitNum = num ? +num : 10;

	let result;

	if (mode === "1")	result = await singleVar(timeFilter, tar, limitNum);
	if (mode === "2") result = await doubleVar(timeFilter, limitFilter, tar, limitNum);
	if (mode === "3") result = await numByDate(timeFilter);
	if (mode === "4") result = await mapTree(timeFilter);

	res.send(result);
});

app.use(function(req, res) {
	res.status(404).send("Not found");
});

app.listen(3000, () => {
	console.log("Server is running on port 3000.");
});
