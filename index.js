const express = require('express');
const app = express();
const DB = require('./database.js');

// The service port. In production the application is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the application's static content
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetScores - THESE ARE FOR DATABASE!
apiRouter.get('/allResults', async (_req, res) => {
  const allResults = await DB.getRecentResults();
  res.send(allResults);
});

// SubmitScore
apiRouter.post('/result', async (req, res) => {
  DB.addResult(req.body);
  const allResults = await DB.getRecentResults();
  res.send(allResults);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


// updateScores considers a new score for inclusion in the high scores.
// The high scores are saved in memory and disappear whenever the service is restarted.


//THIS IS UNNEEDED UNDER HERE AFTER WE ADD MONGODB 

// let allResults = [];
// function updateResults(newResult, allResults) {
  
//   allResults.push(newResult);

//   if (allResults.length > 10) {
//     allResults.length = 10;
//   }

//   return allResults;
// }


