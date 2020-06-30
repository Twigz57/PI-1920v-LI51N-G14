
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
      console.log(rsp)
      return rsp.json()
    }
  
    function showTaskResultsView(body) {
      console.log(body)
      let key = Object.keys(body)[0];
      body = applyFilter(body[key]);
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

  function applyFilter(body) {
    //console.log("ANTES \n")
    var user= getCookie("user_cookie")
    var toRet = []
    body.forEach((e)=>{
      if(e.owner==user || e.owner=="" || e.owner==null || e.owner==undefined) toRet.push(e);
      console.log(e)
    })
    return toRet
    //console.log("DEPOIS \n")
  }
  
  function getCookie(cname) { //user_name
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  