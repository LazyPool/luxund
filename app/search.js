const { MongoClient } = require("mongodb");

const uri = "mongodb://mongo:27017?minPoolSize=10&maxPoolSize=100";
const client = new MongoClient(uri);

async function search(filter) {
	let result;
	try {
		await client.connect();
		console.log("Connected successfully to server");

		const luxund = client.db("luxund");
		const people = luxund.collection("diary");

		result = await people.find(filter).toArray();
	} catch(err) {
		console.error(err);
	} finally {
		setTimeout(() => {client.close();}, 1500);
	}
	return result;
} 

module.exports = search;
