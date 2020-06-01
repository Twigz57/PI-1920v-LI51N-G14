
module.exports = function (tasksResults) {

  const results = document.getElementById("results")
  let group_id =document.getElementById("group_id")
  let max = document.getElementById("max")
  let min = document.getElementById("min")
  const search = document.getElementById("search")

  search.addEventListener("click", event => { console.log("prevent defaut"); event.preventDefault() }, true)
  search.onclick = searchClick;
  

  
  function ajaxSeach() {
    const url = `http://localhost:3000/groups/${group_id.value}/games?max=${max.value}&min=${min.value}`
    fetch(url)
      .then(processResponse)
      .then(showTaskResultsView)
      .catch(showSearchError)
  }

  function searchClick(event) {
    ajaxSeach()
  }
  function processResponse(rsp) {
    if (!rsp.ok) {
      throw "error"
    }
    console.log("$$$$$")
    return rsp.json()
  }

  function showTaskResultsView(body) {
    console.log(body)
    let key = Object.keys(body)[0];
    body = body[key];
    results.innerHTML = tasksResults({body:body,key:key})
    // console.log(body[0])
   //  let key = Object.keys(body)[0];
   // body = body[key];
    // console.log(body[0].Name)
     //let games = body[0].games[0]
     //localStorage.setItem("group_name",body[0].name)
     //localStorage.setItem("group_id",body[0].id)
     //localStorage.setItem("group_description",body[0].description)
     //results.innerHTML = tasksResults({body:body,key:key,games:games})
    /*let key = Object.keys(body)[0];
    body = body[key];
    localStorage.setItem("group_name",body){title: key , body:body}*/
    //results.innerHTML = tasksResults(body)
   // window.location.hash = "#groupResults"
    // Register on the click event for each card result to show the task details
    /*document.querySelectorAll('#results .card').forEach(handleClick)
    function handleClick(card, idx) {
      card.onclick = function () {
        const id = `${body[idx].id}`
        localStorage.setItem("fid",id)
        window.location.hash = "#groupsDetail"
      }
    }*/
  }


  function showSearchError(e) {
    console.log("####" + e)
    results.innerHTML = "Search not available. Try again later...";

  }
}

