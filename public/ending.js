function retrieveResult() {
    const resultsText = localStorage.getItem('allResults');
    allResults = JSON.parse(resultsText);
    lastResult = allResults[allResults.length - 1];

    const section = document.querySelector('#result');
    const resultEl = document.createElement('p');
    
    resultEl.textContent = lastResult.result;
    section.appendChild(resultEl);

  }

    // Event messages
const GameEndEvent = 'gameEnd';
const GameStartEvent = 'gameStart';

function reset() {
  // Let other players know a new game has started
  this.broadcastEvent(this.getPlayerName(), GameStartEvent, {});
}

function getPlayerName() {
  return localStorage.getItem('userName') ?? 'Mystery player';
}

retrieveResult();