module.exports = function () {

  const results = document.getElementById("results")
  const titleName = document.getElementById("titleName")
  const inputName = document.getElementById("inputName")
  const submit = document.getElementById("submit")
  const inputDescription = document.getElementById("inputDescription")

  const group_name = localStorage.getItem("group_name")
  const group_id = localStorage.getItem("group_id")
  const group_description = localStorage.getItem("group_description")
  
  showView()
  
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
  ///favorites/1?name=Group :1 New Name&description=this is a newest description
  
  function ajaxSeach() {
    const url = `http://localhost:3000/group/${group_id}?`
    let params =`name=${inputName.value}&description=${inputDescription.value}`
    let option= { method: 'PUT', headers: { 'Content-Type': 'application/json' }}
    console.log(url+params)
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
    console.log(rsp)
    return rsp.json()
  }

  function showResultsView(body) {
    console.log(body);
    results.innerHTML = "This group was successfully updated!";
    setTimeout(redirect, 1000);
    
  }

  function redirect() {
    localStorage.setItem("pid",group_id)
    window.location.hash = "#groupDetail"
  }

  function showView() {
    console.log("IM HERE!")
    console.log(group_name);
    titleName.innerHTML = group_name;
    inputName.setAttribute("placeholder",group_name)
    inputDescription.setAttribute("placeholder",group_description)
  }

  

  function showSearchError(e) {
    console.log("####" + e)
    results.innerHTML = "Search not available. Try again later...";

  }
}

