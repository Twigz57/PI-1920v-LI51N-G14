module.exports = function () {

  const results = document.getElementById("results")
  const username = document.getElementById("username")
  const fullname = document.getElementById("fullname")
  const password = document.getElementById("password")
  const submit = document.getElementById("submit")
  
  submit.addEventListener("click", event => { console.log("prevent defaut"); event.preventDefault() }, true)
  submit.onclick = submitClick;

  function submitClick(event) {
    console.log("submitClick")
    if(username.value!="" && password.value!="" && fullname.value!="")
      ajaxSeach()
    else{results.innerHTML = "You need to insert values!";}
  }

  function showSearchError(e) {
    console.log("####" + e)
    results.innerHTML = "Try again later...";

  }
  ///favorites/1?name=Group :1 New Name&description=this is a newest description
  
  function ajaxSeach() {
    const url = `http://localhost:3000/signup`
    let body = `{"username":"${username.value}","password":"${password.value}","fullname":"${fullname.value}"}`
    let option = { method: 'POST', body: body, headers: { 'Content-Type': 'application/json' } }
    fetch(url, option)
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
    results.innerHTML = "Account Created";
    setTimeout(redirect, 1000);
    
  }

  function redirect() {
    window.location.hash = "#"
  }
  

  function showSearchError(e) {
    console.log("####" + e)
    results.innerHTML = "Try again later...";

  }
}

