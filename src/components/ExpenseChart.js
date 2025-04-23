import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ExpenseChart({ expenses }) {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    if (expenses.length === 0) return;

    // Group expenses by month and category
    const monthlyData = expenses.reduce((acc, expense) => {
      const date = new Date(expense.date);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
      
      if (!acc[monthYear]) {
        acc[monthYear] = {};
      }
      
      acc[monthYear][expense.category] = (acc[monthYear][expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    // Get all unique categories
    const categories = [...new Set(expenses.map(expense => expense.category))];

    // Prepare data for chart
    const labels = Object.keys(monthlyData).sort();
    const datasets = categories.map(category => ({
      label: category,
      data: labels.map(month => monthlyData[month][category] || 0),
      backgroundColor: getRandomColor(),
    }));

    setChartData({
      labels,
      datasets,
    });
  }, [expenses]);

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Expenses by Category',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount ($)',
        },
      },
    },
  };

  return (
    <div className="h-96">
      <Bar options={options} data={chartData} />
    </div>
  );
}