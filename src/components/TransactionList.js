// frontend/src/components/TransactionList.js
import React from 'react';

function Row({ item, isExpense }) {
  return (
    <div className="trans-card">
      <div>
        <div style={{fontWeight:700}}>{item.description}</div>
        <div style={{fontSize:12, color:'#9aa6b2'}}>{item.category || ''} • {new Date(item.id || Date.now()).toLocaleString()}</div>
      </div>
      <div style={{textAlign:'right'}}>
        <div style={{fontWeight:800}}>{isExpense ? '-' : '+'} ₹{Number(item.amount).toFixed(2)}</div>
        <div style={{fontSize:12}}>{isExpense ? <span style={{color:'#fb7185'}}>Expense</span> : <span style={{color:'#86efac'}}>Income</span>}</div>
      </div>
    </div>
  );
}

export default function TransactionList({ incomes = [], expenses = [] }) {
  return (
    <div style={{marginTop:18}}>
      <h3 style={{marginBottom:6}}>Transactions</h3>
      <div className="card">
        {incomes.length === 0 && expenses.length === 0 && <div style={{color:'#9aa6b2'}}>No transactions yet. Add income or expense.</div>}
        {incomes.map(i => <Row key={`i${i.id}`} item={i} isExpense={false} />)}
        {expenses.map(e => <Row key={`e${e.id}`} item={e} isExpense={true} />)}
      </div>
    </div>
  );
}
