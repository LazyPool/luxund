async function timeFilter(sy, sm, sd, ey, em, ed, ry, rm, rd) {
	sy = +sy; sm = +sm; sd = +sd;
	ey = +ey; em = +em; ed = +ed;
	ry = +ry; rm = +rm; rd = +rd;

	if (!sy || !sm || !sd || !ey || !em || !ed) return {};
	if (sy < 0 || ey < 0 || sy > ey) return {};
	if (sy === ey && sm > em) return {};
	if (sy === ey && sm === em && sd > ed) return {};
	
	let timefilter = {};
	let conditions = [];

	if (sy === ey) {
		if (sm === em) {
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

	timefilter.$or = conditions;

	if (ry) timefilter.年 = ry;
	if (rm) timefilter.月 = rm;
	if (rd) timefilter.日 = rd;

	return timefilter;
}

module.exports = { timeFilter };
