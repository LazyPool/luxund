const { MongoClient } = require("mongodb");

const uri = "mongodb://mongo:27017?minPoolSize=10&maxPoolSize=100";
const client = new MongoClient(uri);

client.connect((err) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log("Connected successfully to server");
});

async function search(filter) {
	let result;
	try {
		const luxund = client.db("luxund");
		const people = luxund.collection("diary");

		result = await people.find(filter).toArray();
	} catch(err) {
		console.error(err);
	}
	return result;
} 

module.exports = search;
