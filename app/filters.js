async function timeFilter(sy, sm, sd, ey, em, ed, ry, rm, rd) {
	sy = +sy; sm = +sm; sd = +sd;
	ey = +ey; em = +em; ed = +ed;
	ry = +ry; rm = +rm; rd = +rd;

	let conditions = [];
	let restrictions = [];

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

	if (ry) restrictions.push({ 年: ry });
	if (rm) restrictions.push({ 月: rm });
	if (rd) restrictions.push({ 日: rd });

	return { $or: conditions, $and: restrictions };
}

module.exports = { timeFilter };