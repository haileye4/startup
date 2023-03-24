async function loadResults() {
    let results = [];
    //const resultsText = localStorage.getItem('allResults');
    //if (resultsText) {
    //  results = JSON.parse(resultsText);
    //}
  
    try {
      // Get the latest high scores from the service
      const response = await fetch('/api/results');
      results = await response.json();
  
      // Save the scores in case we go offline in the future
      localStorage.setItem('allResults', JSON.stringify(results));
    } catch {
      // If there was an error then just use the last saved scores
      const resultsText = localStorage.getItem('allResults');
      if (resultsText) {
        results = JSON.parse(resultsText);
      }
    }

    displayResults(results);
  }

  function displayResults(results) {
    const tableBodyEl = document.querySelector('#results');
  
    if (results.length) {
      for (const [i, result] of results.entries()) {
        const positionTdEl = document.createElement('td');
        const nameTdEl = document.createElement('td');
        const resultTdEl = document.createElement('td');
        const dateTdEl = document.createElement('td');
  
        positionTdEl.textContent = i + 1;
        nameTdEl.textContent = result.name;
        resultTdEl.textContent = result.result;
        dateTdEl.textContent = result.date;
  
        const rowEl = document.createElement('tr');
        rowEl.appendChild(positionTdEl);
        rowEl.appendChild(nameTdEl);
        rowEl.appendChild(resultTdEl);
        rowEl.appendChild(dateTdEl);
  
        tableBodyEl.appendChild(rowEl);
      }
    } else {
      tableBodyEl.innerHTML = '<tr><td colSpan=4>Be the first!</td></tr>';
    }
  }
  
loadResults();

function resetScores() {
  const blank = [];
  localStorage.setItem('allResults', JSON.stringify(blank));
}