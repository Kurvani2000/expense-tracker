import { useForm } from 'react-hook-form';

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

export default function ExpenseForm({ onSubmit, initialData, onCancel }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialData || {
      description: '',
      amount: '',
      category: categories[0],
      date: new Date().toISOString().split('T')[0]
    }
  });

  const submitHandler = (data) => {
    onSubmit({
      ...data,
      amount: parseFloat(data.amount),
      date: new Date(data.date).toISOString()
    });
    if (!initialData) reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <input
          type="text"
          {...register('description', { required: 'Description is required' })}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Amount ($)
        </label>
        <input
          type="number"
          step="0.01"
          {...register('amount', { 
            required: 'Amount is required',
            min: { value: 0.01, message: 'Amount must be greater than 0' }
          })}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.amount && (
          <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          {...register('category')}
          className="w-full px-3 py-2 border rounded-md"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date
        </label>
        <input
          type="date"
          {...register('date', { required: 'Date is required' })}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.date && (
          <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
        )}
      </div>

      <div className="flex space-x-3">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {initialData ? 'Update Expense' : 'Add Expense'}
        </button>
        
        {initialData && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}