const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

const list = document.getElementById("list");

const text = document.getElementById("text");
const amount = document.getElementById("amount");
const type = document.getElementById("type");

const addBtn = document.getElementById("addBtn");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function updateValues() {

    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach(transaction => {

        if (transaction.type === "income") {
            incomeTotal += transaction.amount;
        } else {
            expenseTotal += transaction.amount;
        }

    });

    balance.innerText = "₹" + (incomeTotal - expenseTotal);
    income.innerText = "₹" + incomeTotal;
    expense.innerText = "₹" + expenseTotal;
}

function displayTransactions() {

    list.innerHTML = "";

    transactions.forEach((transaction, index) => {

        const li = document.createElement("li");

        if (transaction.type === "expense") {
            li.classList.add("expense");
        }

        li.innerHTML = `
            <span>${transaction.text}</span>
            <span>₹${transaction.amount}</span>
            <button class="delete" data-index="${index}">X</button>
        `;

        list.appendChild(li);

    });

    document.querySelectorAll(".delete").forEach(button => {

        button.addEventListener("click", function () {

            const index = this.getAttribute("data-index");
            deleteTransaction(index);

        });

    });

    updateValues();
}

function deleteTransaction(index) {

    transactions.splice(index, 1);

    updateLocalStorage();

    displayTransactions();

}

addBtn.addEventListener("click", () => {

    const title = text.value.trim();
    const amt = Number(amount.value);

    if (title === "" || amt <= 0) {
        alert("Please enter valid details.");
        return;
    }

    transactions.push({
        text: title,
        amount: amt,
        type: type.value
    });

    updateLocalStorage();

    displayTransactions();

    text.value = "";
    amount.value = "";
    text.focus();

});

displayTransactions();