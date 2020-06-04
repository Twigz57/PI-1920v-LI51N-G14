
module.exports = function (tasksResults) {
  console.log("$$$$$")
  const search = document.getElementById("search")
  let id = document.getElementById("id")
  let moreInfo = document.getElementById("moreInfo")
  const results = document.getElementById("results")
  search.addEventListener("click", event => { console.log("prevent defaut"); event.preventDefault() }, true)
  search.onclick = searchClick;

  

  function searchClick(event) {
    console.log("searchClick")
    ajaxSeach()
  }

  function ajaxSeach() {
    const url = `http://localhost:3000/tvshow?query=${id.value}`
    console.log(url);
    fetch(url)
      .then(processResponse)
      .then(showTaskResultsView)
      .catch(showSearchError)
  }


  function processResponse(rsp) {
    if (!rsp.ok) {
      results.innerHTML = "Search not available. Try again later...";
      throw "error"   
    }
    console.log("$$$$$")
    return rsp.json()
  }

  function showTaskResultsView(body) {
    let key = Object.keys(body)[0];
    body = body[key];
    results.innerHTML = tasksResults({body:body,key:key})

    document.querySelectorAll('#results.card').forEach(handleClick)
    function handleClick(card, idx) {
      card.onclick = function () {
        console.log("HEREEE")
           const id = `${body[idx].id}`
           console.log(body[idx].id)
           localStorage.setItem("tid",id)
           // window.location.hash = "#trackSearch"//`#leagues/${tasks.body.leagues[idx].leagueID}/teams`
      }
    }
  }

  function showSearchError(e) {
    console.log("####" + e)
    results.innerHTML = "Search not available. Try again later...";

  }
}

