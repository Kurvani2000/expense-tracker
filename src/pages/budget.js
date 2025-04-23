import { useExpenses } from '../context/expenseContext';
import { useState } from 'react';

const categories = [
  'Food',
  'Transportation',
  'Housing',
  'Entertainment',
  'Utilities',
  'Healthcare',
  'Education',
  'Subscriptions',
  'Other'
];

export default function Budget() {
  const { budgets, updateBudget } = useExpenses();
  const [editingCategory, setEditingCategory] = useState(null);
  const [newBudget, setNewBudget] = useState('');

  const handleSave = (category) => {
    if (newBudget && !isNaN(newBudget)) {
      updateBudget(category, parseFloat(newBudget));
      setEditingCategory(null);
      setNewBudget('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Monthly Budget Settings</h1>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Monthly Budget
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                  {category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingCategory === category ? (
                    <input
                      type="number"
                      step="0.01"
                      value={newBudget}
                      onChange={(e) => setNewBudget(e.target.value)}
                      className="w-32 px-2 py-1 border rounded-md"
                      placeholder={budgets[category] || '0'}
                    />
                  ) : (
                    `$${(budgets[category] || 0).toFixed(2)}`
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {editingCategory === category ? (
                    <>
                      <button
                        onClick={() => handleSave(category)}
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingCategory(null)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingCategory(category);
                        setNewBudget(budgets[category] || '');
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}