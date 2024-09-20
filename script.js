const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');

// Function to display expenses from localStorage
function displayExpenses() {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenseList.innerHTML = expenses.map((exp, index) => 
        `<li>${exp.expense}: $${exp.amount} 
            <button onclick="deleteExpense(${index})">Delete</button>
        </li>`
    ).join('');
    updateTotalExpenses();  // Update total after displaying expenses
}



// Add expense
expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const expense = document.getElementById('expense').value;
    const amount = document.getElementById('amount').value;

    if (expense === "" || amount === "") {
        alert("Please fill in both fields.");
        return;
    }

    const expenseData = { expense, amount };
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expenseData);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    // Clear the input fields
    document.getElementById('expense').value = '';
    document.getElementById('amount').value = '';

    // Refresh the list
    displayExpenses();
});

// Delete expense
function deleteExpense(index) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
}

// Calculate and display total expenses
function updateTotalExpenses() {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const total = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
    document.getElementById('total-expenses').textContent = total.toFixed(2);
}

// Initial load of expenses
displayExpenses();
