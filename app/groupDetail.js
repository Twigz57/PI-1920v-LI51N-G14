module.exports = function (tasksResults) {

  const results = document.getElementById("results")
  const pid = localStorage.getItem("pid")
  if (pid!=undefined) ajaxSeach(pid)

  function ajaxSeach(pid) {
    const url = `http://localhost:3000/groups/${pid}`
    fetch(url)
      .then(processResponse)
      .then(showTaskResultsView)
      .catch(showSearchError)
  }

  function processResponse(rsp) {
    if (!rsp.ok) {
      throw "error"
    }
    console.log("$$$$$")
    return rsp.json()
  }

  function showTaskResultsView(body) {
    //console.log(body)
    let key = Object.keys(body)[0];
    body = body[key];
    //console.log(body[0].tvshows[0])
    let tvshows = body[0].tvshows[0]
    localStorage.setItem("group_name",body[0].name)
    localStorage.setItem("group_id",body[0].id)
    localStorage.setItem("group_description",body[0].description)
    results.innerHTML = tasksResults({body:body,key:key,tvshows:tvshows})
  }


  function showSearchError(e) {
    console.log("####" + e)
    results.innerHTML = "Search not available. Try again later...";

  }
}
