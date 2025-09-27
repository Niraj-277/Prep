document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expense-form');
    const expenseName = document.getElementById('expense-name');
    const expenseAmount = document.getElementById('expense-amount');
    const expenseDate = document.getElementById('expense-date');
    const expenseList = document.getElementById('expense-list');
    const totalExpenses = document.getElementById('total-expenses');

    let expenses = [];

    // Load from localStorage
    if (localStorage.getItem('expenses')) {
        expenses = JSON.parse(localStorage.getItem('expenses'));
        renderExpenses();
    }

    expenseForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = expenseName.value.trim();
        const amount = parseFloat(expenseAmount.value);
        const date = expenseDate.value;
        if (!name || !amount || !date) return;
        const expense = {
            id: Date.now(),
            name,
            amount,
            date
        };
        expenses.push(expense);
        saveExpenses();
        renderExpenses();
        expenseForm.reset();
    });

    function renderExpenses() {
        expenseList.innerHTML = '';
        let total = 0;
        expenses.forEach(exp => {
            total += exp.amount;
            const li = document.createElement('li');
            const infoDiv = document.createElement('div');
            infoDiv.className = 'expense-info';
            const nameSpan = document.createElement('span');
            nameSpan.className = 'expense-name';
            nameSpan.textContent = exp.name;
            const dateSpan = document.createElement('span');
            dateSpan.className = 'expense-date';
            dateSpan.textContent = new Date(exp.date).toLocaleDateString();
            infoDiv.appendChild(nameSpan);
            infoDiv.appendChild(dateSpan);
            const amountSpan = document.createElement('span');
            amountSpan.className = 'expense-amount';
            amountSpan.textContent = `₹${exp.amount.toFixed(2)}`;
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = function() {
                expenses = expenses.filter(e => e.id !== exp.id);
                saveExpenses();
                renderExpenses();
            };
            li.appendChild(infoDiv);
            li.appendChild(amountSpan);
            li.appendChild(deleteBtn);
            expenseList.appendChild(li);
        });
        totalExpenses.textContent = `₹${total.toFixed(2)}`;
    }

    function saveExpenses() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }
});
