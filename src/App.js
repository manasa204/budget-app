import React, { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import IncomeForm from "./components/IncomeForm";
import BalanceCard from "./components/BalanceCard";
import TransactionList from "./components/TransactionList";
import PieChart from "./components/PieChart";
import api from "./services/api";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  // Load from localStorage
  useEffect(() => {
    setExpenses(api.getExpenses());
    setIncomes(api.getIncomes());
  }, []);

  const addExpense = (item) => {
    const newList = api.createExpense(item);
    setExpenses(newList);
  };

  const addIncome = (item) => {
    const newList = api.createIncome(item);
    setIncomes(newList);
  };

  const totalIncome = incomes.reduce((a, i) => a + i.amount, 0);
  const totalExpense = expenses.reduce((a, e) => a + e.amount, 0);
  const remaining = totalIncome - totalExpense;

  const pieData = [
    { label: "Income", value: totalIncome },
    { label: "Expenses", value: totalExpense },
  ];

  return (
    <div className="app">
      <h1>Budget App </h1>

      <div className="row">
        <div className="col">
          <IncomeForm onAdd={addIncome} />
          <ExpenseForm onAdd={addExpense} />
        </div>
        <div className="col">
          <BalanceCard
            incomes={totalIncome}
            expenses={totalExpense}
            remaining={remaining}
          />
          <PieChart data={pieData} size={220} />
        </div>
      </div>

      <TransactionList incomes={incomes} expenses={expenses} />
    </div>
  );
}
