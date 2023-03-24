   class Game {
  
    constructor() {
      const playerNameEl = document.querySelector('.player-name');
      playerNameEl.textContent = this.getPlayerName();
      console.log(playerNameEl);
    }
  
    getPlayerName() {
      return localStorage.getItem('userName') ?? 'Mystery player';
    }

    pressButton(result) {
      game.saveEnding(result);
    }

    async saveEnding(result) {
      const userName = this.getPlayerName();
      const date = new Date().toLocaleDateString();
      const newResult = { name: userName, result: result, date: date };

    try {
      const response = await fetch('/api/result', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newResult),
      });

      // Store what the service gave us as the high scores
      const results = await response.json();
      localStorage.setItem('allResults', JSON.stringify(results));
    } catch {
      // If there was an error then just track scores locally
      this.updateResultsLocal(newResult);
    }
    }
  


  

    updateResultsLocal(newResult) {
      const userName = this.getPlayerName();
      let allResults = [];
      const resultsText = localStorage.getItem('allResults');

      if (resultsText) {
        allResults = JSON.parse(resultsText);
      }

      allResults.push(newResult)

      if (allResults.length > 10) {
        allResults.length = 10;
      }

      localStorage.setItem('allResults', JSON.stringify(allResults));
    }
}
  

const game = new Game();
