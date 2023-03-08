function loadResults() {
    let results = [];
    const resultsText = localStorage.getItem('allResults');
    if (resultsText) {
      results = JSON.parse(resultsText);
    }
  
    const tableBodyEl = document.querySelector('#results');
  
    if (results.length) {
      for (const [i, result] of results.entries()) {
        const positionTdEl = document.createElement('td');
        const nameTdEl = document.createElement('td');
        const resultTdEl = document.createElement('td');
        const dateTdEl = document.createElement('td');
  
        positionTdEl.textContent = i + 1;
        nameTdEl.textContent = result.name;
        resultTdEl.textContent = result.ending;
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
  