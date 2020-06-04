
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
   // console.log(body.Artists)
      results.innerHTML = tasksResults(body.TV_Shows)
      
      // Register on the click event for each card result to show the task details
    // Register on the click event for each card result to show the task details
    document.querySelectorAll('#results .card').forEach(handleClick)
    function handleClick(card, idx) {
      card.onclick = function () {
        console.log(body)
           const id = `${body.TV_Shows[idx].Name}`
           localStorage.setItem("tid",id)
            window.location.hash = "#albumSearch"//`#leagues/${tasks.body.leagues[idx].leagueID}/teams`
      }
    }
  }


  function showSearchError(e) {
    console.log("####" + e)
    results.innerHTML = "Search not available. Try again later...";

  }
}