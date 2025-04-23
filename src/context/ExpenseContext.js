import { createContext, useContext, useState } from 'react';

const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState({
    Food: 500,
    Transportation: 300,
    Housing: 1000,
    Entertainment: 200
  });

  const addExpense = (expense) => {
    setExpenses([...expenses, { ...expense, id: Date.now() }]);
  };

  const updateExpense = (id, updatedExpense) => {
    setExpenses(expenses.map(exp => exp.id === id ? updatedExpense : exp));
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const updateBudget = (category, amount) => {
    setBudgets({ ...budgets, [category]: Number(amount) });
  };

  return (
    <ExpenseContext.Provider value={{
      expenses,
      budgets,
      addExpense,
      updateExpense,
      deleteExpense,
      updateBudget
    }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  return useContext(ExpenseContext);
}