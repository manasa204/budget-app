// frontend/src/components/IncomeForm.js
import React, { useState } from 'react';

export default function IncomeForm({ onAdd }) {
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const n = Number(amount);
    if (!desc || !amount || Number.isNaN(n)) return alert('Enter valid description and amount');
    onAdd({ description: desc, amount: n });
    setDesc(''); setAmount('');
  };

  return (
    <form className="card" onSubmit={submit}>
      <h3 style={{marginTop:0}}>Add Income</h3>
      <input placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
      <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <button type="submit">Add Income</button>
    </form>
  );
}
