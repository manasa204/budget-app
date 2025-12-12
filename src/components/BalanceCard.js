// frontend/src/components/BalanceCard.js
import React from 'react';

export default function BalanceCard({ incomes = 0, expenses = 0, remaining = 0 }) {
  return (
    <div className="card">
      <h3 style={{marginTop:0}}>Summary</h3>
      <div className="balance-grid">
        <div className="balance-item">
          <div style={{fontSize:12, color:'#9aa6b2'}}>Income</div>
          <div style={{fontWeight:700, marginTop:6}}>₹{Number(incomes).toFixed(2)}</div>
        </div>
        <div className="balance-item">
          <div style={{fontSize:12, color:'#9aa6b2'}}>Expenses</div>
          <div style={{fontWeight:700, marginTop:6}}>₹{Number(expenses).toFixed(2)}</div>
        </div>
        <div className="balance-item" style={{background: remaining < 0 ? 'rgba(251,113,133,0.06)' : undefined}}>
          <div style={{fontSize:12, color:'#9aa6b2'}}>Remaining</div>
          <div style={{fontWeight:700, marginTop:6}}>₹{Number(remaining).toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
