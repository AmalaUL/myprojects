const heading = document.createElement('h1');
heading.textContent = 'Expense Tracker';

const description = document.createElement('input');
description.style.marginRight = '10px';
description.style.height = '50px';
description.style.width = '200px';
description.placeholder = 'Type Your description';
description.id = 'descriptionField';

const amount = document.createElement('input');
amount.style.marginRight = '10px';
amount.style.height = '50px';
amount.style.width = '100px';
amount.placeholder = 'Type amount';
amount.id = 'amountField';

const addExpenseBtn = document.createElement('button');
addExpenseBtn.style.marginRight = '10px';
addExpenseBtn.style.height = '55px';
addExpenseBtn.style.width = '100px';
addExpenseBtn.textContent = 'Add Expense';

const totalExpenseBtn = document.createElement('button');
totalExpenseBtn.style.marginRight = '10px';
totalExpenseBtn.style.height = '55px';
totalExpenseBtn.style.width = '100px';
totalExpenseBtn.textContent = 'Total Expense';

const category = document.createElement('select');
category.setAttribute("id", 'category');
category.style.marginRight = '10px';
category.style.height = '55px';
category.style.width = '100px';
category.appendChild(new Option('Food', 'Food'));
category.appendChild(new Option('Travel', 'Travel'));
category.appendChild(new Option('Shopping', 'Shopping'));
category.appendChild(new Option('Other', 'Other'));

const table = document.createElement('table');
const tbody = document.createElement('tbody');
table.appendChild(tbody);

const showSummary = document.createElement('div');
showSummary.style.marginTop = '10px';

document.body.appendChild(heading);
document.body.appendChild(description);
document.body.appendChild(category);
document.body.appendChild(amount);
document.body.appendChild(addExpenseBtn);
document.body.appendChild(totalExpenseBtn);
document.body.appendChild(table);
document.body.appendChild(showSummary);

addExpenseBtn.addEventListener('click', addExpense);
totalExpenseBtn.addEventListener('click', totalExpense);

generateHeader();

function generateHeader() {
    const nameOFcolumns = ['S.No', 'Description', 'Category', 'Amount'];

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    nameOFcolumns.forEach(col => {
        const th = document.createElement('th');
        th.textContent = col;
        headerRow.appendChild(th)
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

}

let count = 0;
function addExpense() {

    const valueOfDescription = document.getElementById('descriptionField').value;
    const valueOfCategory = document.getElementById('category').value;
    const valueOfAmount = document.getElementById('amountField').value;
    count += 1

    const values = [count, valueOfDescription, valueOfCategory, valueOfAmount]
    const tr = document.createElement('tr');
    values.forEach(row => {
        const td = document.createElement('td');
        td.textContent = row;
        tr.appendChild(td);
    })
    tbody.appendChild(tr);

    //clear inputs
    description.value = '';
    amount.value = '';
}


function totalExpense() {

    const rows = document.querySelectorAll('tbody tr');
    const cell = document.querySelectorAll('tbody tr td:last-child');

    let totalamount = 0;
    for (let i = 0; i < rows.length; i++) {
        totalamount += Number(cell[i].textContent);
    }

    showSummary.textContent = `Total Amount: ${totalamount}`;
}
