const express = require('express');
const app = express();

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
apiRouter.get('/results', (_req, res) => {
  res.send(allResults);
});

// SubmitScore
apiRouter.post('/result', (req, res) => {
  allResults = updateResults(req.body, allResults);
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

let allResults = [];
function updateResults(newResult, allResults) {
  
  allResults.push(newResult);

  if (allResults.length > 10) {
    allResults.length = 10;
  }

  return allResults;
}
