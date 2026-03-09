// CO4: Browser Storage (retrieving data from localStorage)
const user = localStorage.getItem("username");

// CO4: DOM Manipulation (changing text content dynamically)
document.getElementById("welcome").innerText = "Welcome, "+user;

// CO3: Objects and JSON parsing
let data = JSON.parse(localStorage.getItem("monthlyData")) || {};

// CO3: Variable declaration
let chart;

// CO3: JavaScript Function
function saveIncome(){

// CO4: DOM access
const m = month.value;

// CO3: Conditional statement
if(!m) return alert("Select month");

// CO3: Object creation and property initialization
data[m] = data[m] || {income:0,expenses:[],goal:0};

// CO3: Number conversion
data[m].income = Number(income.value);

// CO4: Function call
save();

}

function addExpense(){

const m = month.value;

if(!m) return alert("Select month");

// CO3: Object and array initialization
data[m] = data[m] || {income:0,expenses:[],goal:0};

// CO3: Array method (push)
data[m].expenses.push({

date:date.value,
category:category.value,
amount:Number(amount.value),
payment:payment.value,
notes:notes.value

});

save();

}

function saveGoal(){

const m = month.value;

if(!m) return alert("Select month");

// CO3: Object property assignment
data[m] = data[m] || {income:0,expenses:[],goal:0};

data[m].goal = Number(goal.value);

save();

}

function loadMonth(){

const m = month.value;

// CO3: Conditional statements
if(!m || !data[m]){

// CO4: DOM updates
total.innerText=0;
savings.innerText=0;
goalDisplay.innerText=0;
remaining.innerText=0;

// CO5: Chart visualization update
drawChart([]);

return;

}

const exp = data[m].expenses;

// CO3: Array reduce method
const sum = exp.reduce((s,e)=>s+e.amount,0);

const incomeVal = data[m].income;

const savingVal = incomeVal - sum;

// CO4: DOM manipulation
income.value = incomeVal;

total.innerText=sum;

savings.innerText=savingVal;

goalDisplay.innerText=data[m].goal;

remaining.innerText=data[m].goal - savingVal;

// CO3: Conditional operator
alert.innerText = sum > incomeVal ?
"Expenses exceeded income!" : "";

// CO5: Data visualization using Chart.js
drawChart(exp);

}

function resetMonth(){

const m = month.value;

// CO4: Browser confirmation dialog
if(confirm("Delete month data?")){

// CO3: Object property deletion
delete data[m];

// CO4: Save updated data
save();

}

}

function drawChart(exp){

// CO5: Destroy previous chart instance
if(chart) chart.destroy();

// CO5: Chart.js library for data visualization
chart = new Chart(document.getElementById("chart"),{

type:"pie",

data:{
labels:exp.map(e=>e.category),  // CO3: Array map method
datasets:[{
data:exp.map(e=>e.amount),     // CO3: Array map method
backgroundColor:["#ff6ec7","#b06cff","#6ec7ff","#ffd36e"]
}]
}

});

}

function save(){

// CO4: Storing data in browser storage
localStorage.setItem("monthlyData",JSON.stringify(data));

// CO4: Updating UI
loadMonth();

}

function exportExcel(){

const m = month.value;

// CO3: Conditional check
if(!data[m]) return alert("No data");

// CO3: Array map method to convert objects
const rows = data[m].expenses.map(e=>({

Date:e.date,
Category:e.category,
Amount:e.amount,
Payment:e.payment,
Notes:e.notes

}));

// CO5: XLSX library usage for Excel export
const ws = XLSX.utils.json_to_sheet(rows);

const wb = XLSX.utils.book_new();

XLSX.utils.book_append_sheet(wb,ws,m);

// CO5: File download functionality
XLSX.writeFile(wb,m+"_Report.xlsx");

}

/* Calculator */

// CO3: Function
function press(val){

// CO4: DOM manipulation
calcDisplay.value += val;

}

function clearCalc(){

// CO4: DOM manipulation
calcDisplay.value="";

}

function calculateResult(){

// CO5: Exception handling
try{

// CO3: JavaScript expression evaluation
calcDisplay.value = eval(calcDisplay.value);

}
catch{

// CO5: Error handling
calcDisplay.value="Error";

}

}

function goProfile(){

// CO4: Page navigation
window.location.href="profile.html";

}
