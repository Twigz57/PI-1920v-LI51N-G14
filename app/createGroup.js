module.exports = function () {

  const results = document.getElementById("results")
  const titleName = document.getElementById("titleName")
  const inputName = document.getElementById("inputName")
  var inputIsPublic = document.getElementById("inputIsPublic")
  const submit = document.getElementById("submit")
  const inputDescription = document.getElementById("inputDescription")
  
  submit.addEventListener("click", event => { console.log("prevent defaut"); event.preventDefault() }, true)
  submit.onclick = submitClick;

  function submitClick(event) {
    console.log("submitClick")
    console.log(inputName.value)
    console.log(inputDescription.value);
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
    if(inputIsPublic==null) inputIsPublic=""
    let params =`name=${inputName.value}&description=${inputDescription.value}&owner=${inputIsPublic.value}`
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
    console.log(body);
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
}

