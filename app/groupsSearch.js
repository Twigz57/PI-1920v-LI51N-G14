
module.exports = function (tasksResults) {

    const results = document.getElementById("results")
    
    ajaxSeach()
  
  
    function ajaxSeach() {
    const url = `http://localhost:3000/groups`
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
      let key = Object.keys(body)[0];
      body = body[key];
      localStorage.setItem("group_name",body)
      results.innerHTML = tasksResults({body:body,key:key})
      // Register on the click event for each card result to show the task details
      document.querySelectorAll('#results .card').forEach(handleClick)
      function handleClick(card, idx) {
        card.onclick = function () {
          const id = `${body[idx].id}`
          console.log("ff"+id);
          localStorage.setItem("pid",id)
          window.location.hash = "#groupDetail"
        }
      }
    }
  
  
    function showSearchError(e) {
      console.log("####" + e)
      results.innerHTML = "Search not available. Try again later...";
  
    }
  }
  
  