const { MongoClient } = require('mongodb');

async function searchDatabase(query) {
  const client = new MongoClient('mongodb+srv://your-mongodb-url');
  await client.connect();

  const db = client.db('your-database-name');
  const collection = db.collection('your-collection-name');

  const results = await collection.find({ $text: { $search: query } }).toArray();

  await client.close();

  return results;
}

//  usage:
const searchResults = await searchDatabase('your-search-query');
console.log(searchResults);

