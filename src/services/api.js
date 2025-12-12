// frontend/src/services/api.js
// Frontend-only storage using localStorage.
// Keys: "budget_app_incomes_v1", "budget_app_expenses_v1"

const INCOME_KEY = 'budget_app_incomes_v1';
const EXPENSE_KEY = 'budget_app_expenses_v1';

function read(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('localStorage read error', e);
    return [];
  }
}

function write(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('localStorage write error', e);
  }
}

export default {
  getIncomes() {
    return read(INCOME_KEY);
  },

  getExpenses() {
    return read(EXPENSE_KEY);
  },

  createIncome(item) {
    const list = read(INCOME_KEY);
    const record = { ...item, id: Date.now() };
    list.unshift(record);
    write(INCOME_KEY, list);
    return list;
  },

  createExpense(item) {
    const list = read(EXPENSE_KEY);
    const record = { ...item, id: Date.now() };
    list.unshift(record);
    write(EXPENSE_KEY, list);
    return list;
  },

  // optional: clear all (useful during development)
  clearAll() {
    write(INCOME_KEY, []);
    write(EXPENSE_KEY, []);
  }
};
