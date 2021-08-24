let myLeads = [];
const inputEl = document.getElementById('input-el'); //should be const cause we won't change it anyway throughout the code
const ulEl = document.getElementById('ul-el');
const inputBtn = document.getElementById('input-btn');

const deleteBtn = document.getElementById('delete-btn');
const leadesFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById('tab-btn');

if(leadesFromLocalStorage) {
    myLeads = leadesFromLocalStorage;
    renderLeads(myLeads);
}

inputBtn.addEventListener("click", function() { 
    myLeads.push(inputEl.value);
    inputEl.value = ""; //cleans the input field
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads(myLeads);
});

deleteBtn.addEventListener("click", function() {
    localStorage.clear();
    myLeads = [];
    renderLeads(myLeads);
});

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        renderLeads(myLeads);
    });
    
    
});
//inside of the function we write what ever the code needs to execute 
//when ever the user clicks on the button
//if we write like this, then we dont need onclick="" on html

function renderLeads(leads) {
    let listItems = "";
    for(let i=0; i<leads.length; i++) {
        // ulEl.innerHTML += "<li>" +leads[i]+ "</li>"; // i can write .textcontext but it wont add html. thats the only way to add html through js
        listItems += `
        <li>    
            <a target='_blank' href='${leads[i]}'>
            ${leads[i]}
            </a>
        </li>
        `; //changed so i wont have to manipulate the DOM all the time
    }
    ulEl.innerHTML = listItems;
}





