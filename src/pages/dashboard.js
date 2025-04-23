import BudgetProgress from '../components/BudgetProgress';
import ExpenseChart from '../components/expenseChart';
import { useExpenses } from '../context/expenseContext';

export default function Dashboard() {
  const { expenses, budgets } = useExpenses();

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalBudget = Object.values(budgets).reduce((sum, amount) => sum + amount, 0);
  const remainingBudget = totalBudget - totalSpent;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-500">Total Spent</p>
              <p className="text-2xl font-bold">${totalSpent.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-500">Remaining Budget</p>
              <p className={`text-2xl font-bold ${remainingBudget < 0 ? 'text-red-500' : 'text-green-500'}`}>
                ${remainingBudget.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Budget Progress</h2>
          {Object.entries(budgets).map(([category, budget]) => (
            <BudgetProgress
              key={category}
              category={category}
              spent={expenses
                .filter(e => e.category === category)
                .reduce((sum, e) => sum + e.amount, 0)}
              budget={budget}
            />
          ))}
        </div>
      </div>

      <div className="md:col-span-2">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Spending Trends</h2>
          <ExpenseChart expenses={expenses} />
        </div>
      </div>
    </div>
  );
}