const user = localStorage.getItem("username");

document.getElementById("welcome").innerText = "Welcome, "+user;

let data = JSON.parse(localStorage.getItem("monthlyData")) || {};

let chart;

function saveIncome(){

const m = month.value;

if(!m) return alert("Select month");

data[m] = data[m] || {income:0,expenses:[],goal:0};

data[m].income = Number(income.value);

save();

}

function addExpense(){

const m = month.value;

if(!m) return alert("Select month");

data[m] = data[m] || {income:0,expenses:[],goal:0};

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

data[m] = data[m] || {income:0,expenses:[],goal:0};

data[m].goal = Number(goal.value);

save();

}

function loadMonth(){

const m = month.value;

if(!m || !data[m]){

total.innerText=0;
savings.innerText=0;
goalDisplay.innerText=0;
remaining.innerText=0;

drawChart([]);

return;

}

const exp = data[m].expenses;

const sum = exp.reduce((s,e)=>s+e.amount,0);

const incomeVal = data[m].income;

const savingVal = incomeVal - sum;

income.value = incomeVal;

total.innerText=sum;

savings.innerText=savingVal;

goalDisplay.innerText=data[m].goal;

remaining.innerText=data[m].goal - savingVal;

alert.innerText = sum > incomeVal ?
"Expenses exceeded income!" : "";

drawChart(exp);

}

function resetMonth(){

const m = month.value;

if(confirm("Delete month data?")){

delete data[m];

save();

}

}

function drawChart(exp){

if(chart) chart.destroy();

chart = new Chart(document.getElementById("chart"),{

type:"pie",

data:{
labels:exp.map(e=>e.category),
datasets:[{
data:exp.map(e=>e.amount),
backgroundColor:["#ff6ec7","#b06cff","#6ec7ff","#ffd36e"]
}]
}

});

}

function save(){

localStorage.setItem("monthlyData",JSON.stringify(data));

loadMonth();

}

function exportExcel(){

const m = month.value;

if(!data[m]) return alert("No data");

const rows = data[m].expenses.map(e=>({

Date:e.date,
Category:e.category,
Amount:e.amount,
Payment:e.payment,
Notes:e.notes

}));

const ws = XLSX.utils.json_to_sheet(rows);

const wb = XLSX.utils.book_new();

XLSX.utils.book_append_sheet(wb,ws,m);

XLSX.writeFile(wb,m+"_Report.xlsx");

}

/* Calculator */

function press(val){
calcDisplay.value += val;
}

function clearCalc(){
calcDisplay.value="";
}

function calculateResult(){

try{
calcDisplay.value = eval(calcDisplay.value);
}
catch{
calcDisplay.value="Error";
}

}

function goProfile(){
window.location.href="profile.html";
}