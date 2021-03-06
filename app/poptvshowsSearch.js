
module.exports = function (tasksResults,utils) {

  const results = document.getElementById("results")

  document.onload = ajaxSeach();



  function ajaxSeach() {
  
    const url = `http://localhost:3000/tvshows`;

     fetch(url)
      .then(processResponse)
      .then(showTaskResultsView)
      .catch(showSearchError)
  }

  function processResponse(rsp) {
    if (!rsp.ok) {
      throw "error"
    }
    console.log("$$")
    
    return rsp.json()
  }

  function showTaskResultsView(body) {
      results.innerHTML = tasksResults(body['TV Shows'])
      
      // Register on the click event for each card result to show the task details
    // Register on the click event for each card result to show the task details
    document.querySelectorAll('#results.card').forEach(handleClick)
    function handleClick(card, idx) {
      card.onclick = function () {
        
           const id = `${body['TV Shows'][idx].Name}`
           localStorage.setItem("tid",id)
            window.location.hash = "#tvshowSearch"//`#leagues/${tasks.body.leagues[idx].leagueID}/teams`
      }
    }
  }


  function showSearchError(e) {
    console.log("####" + e)
    results.innerHTML = "Search not available. Try again later...";

  }
}