export default function BudgetProgress({ category, spent, budget }) {
    const percentage = Math.min((spent / budget) * 100, 100);
    const isOverBudget = spent > budget;
  
    return (
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="capitalize">{category}</span>
          <span className={`font-medium ${isOverBudget ? 'text-red-500' : ''}`}>
            ${spent.toFixed(2)} / ${budget.toFixed(2)}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${isOverBudget ? 'bg-red-500' : 'bg-blue-500'}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        {isOverBudget && (
          <p className="text-red-500 text-sm mt-1">
            You{"'"}ve exceeded your budget for {category}!
          </p>
        )}
      </div>
    );
  }