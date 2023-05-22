const { MongoClient } = require('mongodb');

const uri = "mongodb://mongo:27017";
const client = new MongoClient(uri);

async function singleVar(timeFilter, tar, num) {
	let result;
	try {
		await client.connect();
		console.log('Connected successfully to server');

		const luxund = client.db('luxund');
		const people = luxund.collection('diary');

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
		console.log('Connected successfully to server');

		const luxund = client.db('luxund');
		const people = luxund.collection('diary');

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

module.exports = { singleVar, doubleVar };
