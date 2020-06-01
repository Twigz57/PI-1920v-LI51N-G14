module.exports = function () {

  const results = document.getElementById("results")
  const inputGame = document.getElementById("inputGame")


  const add = document.getElementById("add")
  const del= document.getElementById("delete")

  const group_name = localStorage.getItem("group_name")
  const group_id = localStorage.getItem("group_id")
  
  showView()
  
  add.addEventListener("click", event => { console.log("prevent defaut"); event.preventDefault() }, true)
  add.onclick = addClick;

  del.addEventListener("click", event => { console.log("prevent defaut"); event.preventDefault() }, true)
  del.onclick = delClick;

  function addClick(event) {
    console.log("submitClick")
      ajaxSeachAdd()
  }
  function delClick(event) {
    console.log("submitClick")
      ajaxSeachDel()
  }

  function showSearchError(e) {
    console.log("####" + e)
    results.innerHTML = "Search not available. Try again later...";

  }
  
  function ajaxSeachAdd() {
    //}/playlists/6/track?artist=Mac Demarco&track=Nobody
    const url = `http://localhost:3000/groups/${group_id}/game?name=${inputGame.value}`
    let option= { method: 'POST', headers: { 'Content-Type': 'application/json' }}
    fetch(url,option)
      .then(processResponse)
      .then(showResultsView)
      .catch(showSearchError)
  }

  function ajaxSeachDel() {
    //playlists/4/track/2
    const url = `http://localhost:3000/groups/${group_id}/game/${inputGame.value}`
    let option= { method: 'DELETE', headers: { 'Content-Type': 'application/json' }}
    fetch(url,option)
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
    results.innerHTML = "This Game was successfully updated in this group!";
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
  }

  

  function showSearchError(e) {
    console.log("####" + e)
    results.innerHTML = "Game already exists. Try other...";

  }
}
