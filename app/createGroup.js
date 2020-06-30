module.exports = function () {

  const results = document.getElementById("results")
  const titleName = document.getElementById("titleName")
  const inputName = document.getElementById("inputName")
  const inputIsPublic = document.getElementById("inputIsPublic")
  const submit = document.getElementById("submit")
  const inputDescription = document.getElementById("inputDescription")
  
  submit.addEventListener("click", event => { console.log("prevent defaut"); event.preventDefault() }, true)
  submit.onclick = submitClick;

  function submitClick(event) {
    if(inputName.value!=undefined && inputDescription.value!=undefined)
      ajaxSeach()
  }

  function showSearchError(e) {
    console.log("####" + e)
    results.innerHTML = "Search not available. Try again later...";

  }
  
  ///favorites?name=Group 4&description=Group 4 test
  function ajaxSeach() {
    const url = `http://localhost:3000/groups?`
    var owner= inputIsPublic.value==2 ? getCookie("user_cookie") : ""
    let params =`name=${inputName.value}&description=${inputDescription.value}&owner=${owner}`
    let option= { method: 'POST', headers: { 'Content-Type': 'application/json' }}
    fetch(url+params,option)
      .then(processResponse)
      .then(showResultsView)
      .catch(showSearchError)
  }

  function processResponse(rsp) {
    if (!rsp.ok) {
      throw "error"
    }
    console.log("$$$$$")
    return rsp.json()
  }

  function showResultsView(body) {
    results.innerHTML = "This Group was successfully created!";
    setTimeout(function(){
      results.innerHTML = "";
      setTimeout(redirect, 1000);
    }, 1000);
    
  }

  function redirect() {
    window.location.hash = "#welcome"
  }

  function showSearchError(e) {
    console.log("####" + e)
    results.innerHTML = "Search not available. Try again later...";

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
}

