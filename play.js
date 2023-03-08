   class Game {
  
    constructor() {
      const playerNameEl = document.querySelector('.player-name');
      playerNameEl.textContent = this.getPlayerName();
      console.log(playerNameEl);
    }
  
    getPlayerName() {
      return localStorage.getItem('userName') ?? 'Mystery player';
    }

    saveEnding(result) {
      const userName = this.getPlayerName();
      let allResults = [];
      const resultsText = localStorage.getItem('allResults');

      if (resultsText) {
        allResults = JSON.parse(resultsText);
      }

      allResults = this.updateResults(userName, result, allResults);
      localStorage.setItem('allResults', JSON.stringify(allResults));
    }

    pressButton(result) {
      game.saveEnding(result);
    }
  
    updateResults(userName, newResult, allresults) {
      const date = new Date().toLocaleDateString();
      const newEnd = { name: userName, ending: newResult, date: date };
      allresults.push(newEnd);
  
      if (allresults.length > 10) {
        allresults.length = 10;
      }
  
      return allresults;
    }
}
  

const game = new Game();
