const { ObjectId } = require('mongodb');

async function idGen(id) {
	let filter = id ? { _id: new ObjectId(id) } : {};

	return filter;
}

async function timeGen(sy, sm, sd, ey, em, ed, ry, rm, rd) {
	sy = +sy; sm = +sm; sd = +sd;
	ey = +ey; em = +em; ed = +ed;
	ry = +ry; rm = +rm; rd = +rd;

	if (!sy || !ey || !sm || !em || !sd || !ed) return {};
	if (sy < 0 || ey <0 || sy > ey) return {};
	if (sy === ey && sm > em) return {};
	if (sy === ey && sm === em && sd > ed) return {};

	let filter = {}
	let conditions = [];

	if (sy === ey) {
		if (sm == em) {
			conditions.push({ 年: sy, 月: sm, 日: { $gte: sd, $lte: ed }});
		} else {
			conditions.push({ 年: sy, 月: sm, 日: { $gte: sd }});
			conditions.push({ 年: sy, 月: { $gt:sm, $lt:em }});
			conditions.push({ 年: sy, 月: em, 日: { $gte: sd }});
		}
	} else {
		conditions.push({ 年: sy, 月: sm, 日: { $gte: sd }});
		conditions.push({ 年: sy, 月: { $gt:sm }});
		conditions.push({ 年: { $gt: sy, $lt: ey }});
		conditions.push({ 年: ey, 月: { $lt:em }});
		conditions.push({ 年: ey, 月: em, 日: { $lte: ed }});
	}

	filter.$or = conditions;

	if (ry) filter.年 = ry;
	if (rm) filter.月 = rm;
	if (rd) filter.日 = rd;

	return filter;
}

async function posGen(pos) {
	let filter = pos ? { 地点: pos } : {};

	return filter;
}

async function chrGen(chr) {
	let filter = chr ? { 人物: chr } : {};

	return filter;
}

async function whrGen(whr) {
	let filter = whr ? { 天气: pos } : {};

	return filter;
}

async function itemGen(item) {
	let filter = item ? { 物件: item } : {};

	return filter;
}

async function affrGen(affr) {
	let filter = affr ? { 事件: affr } : {};

	return filter;
}

module.exports = { idGen, timeGen, posGen, chrGen, whrGen, itemGen, affrGen };
