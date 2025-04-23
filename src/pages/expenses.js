import Layout from '../components/layout';
import ExpenseForm from '../components/expenseForm';
import ExpenseList from '../components/expenseList';
import { useState } from 'react';

export default function Expenses() {
  const { expenses, loading, addExpense, updateExpense, deleteExpense } = useExpenses();
  const [editingExpense, setEditingExpense] = useState(null);

  const handleSubmit = (expense) => {
    if (editingExpense) {
      updateExpense(editingExpense.id, expense);
      setEditingExpense(null);
    } else {
      addExpense(expense);
    }
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h1 className="text-2xl font-bold mb-6">Add/Edit Expense</h1>
          <ExpenseForm 
            onSubmit={handleSubmit} 
            initialData={editingExpense} 
            onCancel={() => setEditingExpense(null)}
          />
        </div>
        
        <div>
          <h1 className="text-2xl font-bold mb-6">Your Expenses</h1>
          {loading ? (
            <p>Loading expenses...</p>
          ) : (
            <ExpenseList 
              expenses={expenses} 
              onEdit={setEditingExpense} 
              onDelete={deleteExpense} 
            />
          )}
        </div>
      </div>
    </Layout>
  );
}