function retrieveResult() {
    const resultsText = localStorage.getItem('allResults');
    allResults = JSON.parse(resultsText);
    lastResult = allResults[allResults.length - 1];

    const section = document.querySelector('#result');
    const resultEl = document.createElement('p');
    
    resultEl.textContent = lastResult.result;
    section.appendChild(resultEl);

  }

  retrieveResult();