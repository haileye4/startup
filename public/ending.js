function retrieveResult() {
    const playerNameEl = document.querySelector('.player-name');
    playerNameEl.textContent = this.getPlayerName();
    console.log(playerNameEl);

    const resultsText = localStorage.getItem('PersonalResult');
    lastResult = JSON.parse(resultsText);

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