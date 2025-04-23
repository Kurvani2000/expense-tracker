import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/dashboard" className="text-xl font-bold text-blue-600">
          Expense Tracker
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
          <Link href="/expenses" className="hover:text-blue-600">
            Expenses
          </Link>
          <Link href="/budget" className="hover:text-blue-600">
            Budget
          </Link>
        </div>
      </div>
    </nav>
  );
}