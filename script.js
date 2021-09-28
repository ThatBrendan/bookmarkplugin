const inputBtn = document.getElementById("input-btn");
let myLeads = [];
const inputEl = document.getElementById("input-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const ulEl = document.getElementById("ul-el");

const leadsFromLocalStorage = JSON.parse(
  localStorage.getItem("myLeads")
); /*get leads from localstorage*/

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads); /*saving localstorage leads to browser*/
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
}); /*savetab button collecting url from active page to extension*/

/*Rendering leads to the webpage*/
function render(leads) {
  let listItems = "";

  for (let i = 0; i < leads.length; i++) {
    listItems += `<li>
      <a target = '_blank' href ='${leads[i]}' > ${leads[i]}
      </a>
      </li>`;
  }
  ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value); /*get value from input field*/
  inputEl.value = ""; /*to clear input value*/
  localStorage.setItem(
    "myLeads",
    JSON.stringify(myLeads)
  ); /*to save leads to local storage*/
  render(myLeads);
});
