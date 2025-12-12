// frontend/src/components/ExpenseForm.js
import React, { useState } from 'react';

export default function ExpenseForm({ onAdd }) {
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('General');

  const submit = (e) => {
    e.preventDefault();
    const n = Number(amount);
    if (!desc || !amount || Number.isNaN(n)) return alert('Enter valid description and amount');
    onAdd({ description: desc, amount: n, category });
    setDesc(''); setAmount(''); setCategory('General');
  };

  return (
    <form className="card" onSubmit={submit}>
      <h3 style={{marginTop:0}}>Add Expense</h3>
      <input placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
      <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option>General</option>
        <option>Food</option>
        <option>Transport</option>
        <option>Shopping</option>
        <option>Bills</option>
      </select>
      <button type="submit">Add Expense</button>
    </form>
  );
}
