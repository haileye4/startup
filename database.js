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
const scoreCollection = client.db('startup').collection('result');

function addScore(score) {
  scoreCollection.insertOne(score);
}

function getHighScores() {
  const query = {score: {$gt: 0}};
  const options = {
    sort: {score: -1},
    limit: 10,
  };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}

module.exports = {addScore, getHighScores};
