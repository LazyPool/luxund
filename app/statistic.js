const { MongoClient } = require("mongodb");

const uri = "mongodb://mongo:27017";
const client = new MongoClient(uri);

async function singleVar(timeFilter, tar, num) {
	let result;
	try {
		await client.connect();
		console.log("Connected successfully to server");

		const luxund = client.db("luxund");
		const people = luxund.collection("diary");

		result = await people.aggregate([
			{ $match: timeFilter },
			{ $unwind: tar },
			{ $group: {
				_id: tar,
				count: { $sum: 1 }
			} },
			{ $sort: { count: -1 } },
			{ $limit: num }
		]).toArray();
	} catch(err) {
		console.error(err);
	} finally {
		await client.close();
	}
	return result;
}

async function doubleVar(timeFilter, limitFilter, tar, num) {
	let result;
	try {
		await client.connect();
		console.log("Connected successfully to server");

		const luxund = client.db("luxund");
		const people = luxund.collection("diary");

		result = await people.aggregate([
			{ $match: timeFilter },
			{ $match: limitFilter },
			{ $unwind: tar },
			{ $group: {
				_id: tar,
				count: { $sum: 1 }
			} },
			{ $sort: { count: -1 } },
			{ $limit: num }
		]).toArray();
	} catch(err) {
		console.error(err);
	} finally {
		await client.close();
	}
	return result;
}

async function numByDate(timeFilter) {
	let result;
	try {
		await client.connect();
		console.log("Connected successfully to server");

		const luxund = client.db("luxund");
		const people = luxund.collection("diary");

		result = await people.aggregate([
			{ $match: timeFilter },
			{ $addFields: { whr: { $size: { $ifNull: [ "$天气", [] ] } } } },
			{ $addFields: { affr: { $size: { $ifNull: [ "$事件", [] ] } } } },
			{ $addFields: { chr: { $size: { $ifNull: [ "$人物", [] ] } } } },
			{ $addFields: { item: { $size: { $ifNull: [ "$物件", [] ] } } } },
			{ $addFields: { pos: { $size: { $ifNull: [ "$地点", [] ] } } } },
			{ $addFields: { datestring: { $concat: [ { $toString: "$年" }, "-", { $toString: "$月" }, "-", { $toString: "$日" } ]} } },
			{ $addFields: { date: { $dateFromString: { dateString: "$datestring", format: "%Y-%m-%d" } } } },
			{ $project: { date: 1, whr: 1, affr: 1, chr: 1, item: 1, pos: 1, _id: 0 } }
		]).toArray();
	} catch(err) {
		console.log(err);
	} finally {
		await client.close();
	}
	console.log(result);
	return result;
}

module.exports = { singleVar, doubleVar, numByDate };
