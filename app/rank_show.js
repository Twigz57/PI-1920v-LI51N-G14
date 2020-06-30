module.exports = function () {

    const results = document.getElementById("results")
    //const titleName = document.getElementById("titleName")
    const inputName = document.getElementById("inputName")
    const submit = document.getElementById("submit")
    const inputRating = document.getElementById("inputRating")
  
    const group_name = localStorage.getItem("group_name")
    const group_id = localStorage.getItem("group_id")
    const group_description = localStorage.getItem("group_description")
    
    showView()
    
    submit.addEventListener("click", event => { console.log("prevent defaut"); event.preventDefault() }, true)
    submit.onclick = submitClick;
  
    function submitClick(event) {
      console.log("submitClick")
      console.log(inputName.value)
      console.log(inputRating.value);
     //() if(inputName.value!=undefined && inputRating.value!=undefined)
        ajaxSeach()
    }
  
    function showSearchError(e) {
      console.log("####" + e)
      results.innerHTML = "Search not available. Try again later...";
  
    }
    
    function ajaxSeach() {
        console.log("2")
      const url = `http://localhost:3000/groups/${group_id}/rank_show?`
      let params =`rating=${inputRating.value}&nameTV=${inputName.value}`
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
      results.innerHTML = "This rating  was successfully updated!";
      setTimeout(redirect, 1000);
      
    }
  
    function redirect() {
      localStorage.setItem("pid",group_id)
      window.location.hash = "#groupDetail"
    }
  
    function showView() {
      console.log("IM HERE!")
    }
  
    
  
    function showSearchError(e) {
      console.log("####" + e)
      results.innerHTML = "Search not available. Try again later...";
  
    }
  }
  
  