const {MongoClient} = require('mongodb');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

// const userName = "haileyjohnson3";
// const password = "8isGreat";
// const hostname = "cluster1.eaezisx.mongodb.net";

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const resultCollection = client.db('startup').collection('result');

function addResult(result) {
  resultCollection.insertOne(result);
}

function getRecentResults() {
  const query = {};
  const options = {
    limit: 10,
  };
  const cursor = resultCollection.find(query, options);
  return cursor.toArray();
}

module.exports = {addResult, getRecentResults};
