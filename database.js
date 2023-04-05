const {MongoClient} = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

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
const userCollection = client.db('startup').collection('user');
const resultCollection = client.db('startup').collection('allResults');

function getUser(email) {
    return userCollection.findOne({ email: email });
}
  
function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}
  
async function createUser(email, password) {
    // Hash the password before we insert it into the database
    const passwordHash = await bcrypt.hash(password, 10);
  
    const user = {
      email: email,
      password: passwordHash,
      token: uuid.v4(),
    };
    await userCollection.insertOne(user);
  
    return user;
}
  

function addResult(result) {
  resultCollection.insertOne(result);
}

function getRecentResults() {
  const query = {};
  //mongo of chat gpt how to show up recent 10 in descending date order
  const options = { 
    limit: 10,
  };
  const cursor = resultCollection.find(query, options);
  return cursor.toArray();
}

module.exports = {addResult, getRecentResults, getUser, getUserByToken, createUser};
