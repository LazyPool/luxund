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
		console.log("Catch Error at SingleVar!");
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
		console.log("Catch Error at DoubleVar!");
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
			{ $addFields: { datestring: { $concat: [ { $toString: "$年" }, "-", { $toString: "$月" }, "-", { $toString: "$日" } ] } } },
			{ $addFields: { date: { $dateFromString: { dateString: "$datestring", format: "%Y-%m-%d" } } } },
			{ $group: {
				_id: {
					year: { $year: "$date" },
					month: { $month: "$date" }
				},
				total_whr: { $sum: "$whr" },
				total_affr: { $sum: "$affr" },
				total_chr: { $sum: "$chr" },
				total_item: { $sum: "$item" },
				total_pos: { $sum: "$pos" },
			} },
			{ $addFields: { name: { $concat: [ { $toString: "$_id.year" }, "-" , { $toString: "$_id.month" } ] } } },
			{ $sort : { "_id.year": 1, "_id.month": 1 } }
		]).toArray();
	} catch(err) {
		console.log("Catch Error at NumByDate!");
		console.log(err);
	} finally {
		await client.close();
	}
	return result;
}

async function mapTree(timeFilter) {
	let result;
	try {
		await client.connect();
		console.log("Connected successfully to server");

		const luxund = client.db("luxund");
		const people = luxund.collection("diary");

		result = await people.aggregate([
			{ $match: timeFilter },
			{
				$facet: {
					whr: [
						{	$unwind: "$天气"},
						{ $group: { _id: "$天气", size: { $sum: 1 } } },
						{ $project: { _id: 0, name: "$_id", size: 1 } },
						{ $sort: { size: -1 }},
						{ $limit: 15 }
					],
					affr: [
						{ $unwind: "$事件" },
						{ $group: { _id: "$事件", size: { $sum: 1 } } },
						{ $project: { _id: 0, name: "$_id", size: 1 } },
						{ $sort: { size: -1 }},
						{ $limit: 15 }
					],
					chr: [
						{ $unwind: "$人物" },
						{ $group: { _id: "$人物", size: { $sum: 1 } } },
						{ $project: { _id: 0, name: "$_id", size: 1 } },
						{ $sort: { size: -1 }},
						{ $limit: 15 }
					],
					item: [
						{ $unwind: "$物件" },
						{ $group: { _id: "$物件", size: { $sum: 1 } } },
						{ $project: { _id: 0, name: "$_id", size: 1 } },
						{ $sort: { size: -1 }},
						{ $limit: 15 }
					],
					pos: [
						{ $unwind: "$地点" },
						{ $group: { _id: "$地点", size: { $sum: 1 } } },
						{ $project: { _id: 0, name: "$_id", size: 1 } },
						{ $sort: { size: -1 }},
						{ $limit: 15 }
					],
				}
			},
			{ 
				$project: {
					result: {
						$concatArrays: [
							[{name: "whr", children: "$whr"}],
							[{name: "affr", children: "$affr"}],
							[{name: "chr", children: "$chr"}],
							[{name: "item", children: "$item"}],
							[{name: "pos", children: "$pos"}],
						]
					}
				} 
			}
		]).toArray();
	} catch(err) {
		console.log("Catch Error at MapTree!");
		console.log(err);
	} finally {
		await client.close();
	}
	return result;
}

async function wordCloud(timeFilter) {
	let result;
	try {
		await client.connect();
		console.log("Connected successfully to server");

		const luxund = client.db("luxund");
		const people = luxund.collection("diary");

		result = await people.aggregate([
			{ $match: timeFilter },
			{ $project: { words: { $concatArrays: ["$天气", "$事件", "$人物", "$物件", "$地点"]}}},
			{ $unwind: "$words" },
			{ $group: { _id: "$words", count: { $sum: 1}}},
			{ $project: { _id: 0, name: "$_id", value: "$count"}},
			{ $sort: { value: -1 } },
			{ $limit: 300 }
		]).toArray();
	} catch(err) {
		console.log("Catch Error at WordCloud!");
		console.log(err);
	} finally {
		await client.close();
	}
	return result;
}

module.exports = { singleVar, doubleVar, numByDate, mapTree, wordCloud };
