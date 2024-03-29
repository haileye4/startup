  // Event messages
const GameEndEvent = 'gameEnd';
const GameStartEvent = 'gameStart';

  class Game {
    socket;
  
    constructor() {
      const playerNameEl = document.querySelector('.player-name');
      playerNameEl.textContent = this.getPlayerName();
      console.log(playerNameEl);
      this.configureWebSocket();
    }
  
    getPlayerName() {
      return localStorage.getItem('userName') ?? 'Mystery player';
    }

    pressButton(result) {
      this.saveEnding(result);
    }

    async saveEnding(result) {
      const userName = this.getPlayerName();
      const date = new Date().toLocaleDateString();
      const newResult = { name: userName, result: result, date: date };

    try {
      const response = await fetch('/api/allResults', { 
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newResult),
      });

      // Let other players know the game has concluded
      this.broadcastEvent(userName, GameEndEvent, newResult);

    } catch {

      // If there was an error then just track scores locally
      this.updateResultsLocal(newResult);
    }

    localStorage.setItem('PersonalResult', JSON.stringify(newResult));
    window.location.href= 'ending.html';
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

    broadcastBro() {
      // Let other players know a new game has started
      const userName = this.getPlayerName();
      this.broadcastEvent(userName, GameStartEvent, {});
    }

    // Functionality for peer communication using WebSocket

  configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    this.socket.onopen = (event) => {
      this.displayMsg('system', 'game', 'connected');
    };
    this.socket.onclose = (event) => {
      this.displayMsg('system', 'game', 'disconnected');
    };
    this.socket.onmessage = async (event) => {
      const msg = JSON.parse(await event.data.text());
      if (msg.type === GameEndEvent) {
        this.displayMsg('player', msg.from, ` ${msg.value.result}`);
        //SET LOCAL VARIABLE TO THIS RESULT...
      } else if (msg.type === GameStartEvent) {
        this.displayMsg('player', msg.from, `started a new game`);
      }
    };
  }

  displayMsg(cls, from, msg) {
    const chatText = document.querySelector('#player-messages');
    chatText.innerHTML =
      `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` + chatText.innerHTML;
  }

  broadcastEvent(from, type, value) {
    const event = {
      from: from,
      type: type,
      value: value,
    };
    this.socket.send(JSON.stringify(event));
  }
}
  

const game = new Game();
