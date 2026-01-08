import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const ExpensesChart = ({ transactions }) => {
    // Filter expenses
    const expenses = transactions.filter(t => t.amount < 0);
    
    // Group by category
    const categoryTotals = expenses.reduce((acc, curr) => {
        const cat = curr.category;
        const amount = Math.abs(curr.amount);
        acc[cat] = (acc[cat] || 0) + amount;
        return acc;
    }, {});

    const totalExpenses = Object.values(categoryTotals).reduce((a, b) => a + b, 0);

    const data = {
        labels: Object.keys(categoryTotals),
        datasets: [
            {
                label: 'Expenses by Category',
                data: Object.values(categoryTotals),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                    'rgba(99, 102, 241, 0.8)', 
                    'rgba(236, 72, 153, 0.8)', 
                ],
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 2,
                hoverOffset: 4
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#e2e8f0', // slate-200
                    font: {
                        family: 'Poppins',
                        size: 12
                    }
                },
                position: 'bottom'
            },
            tooltip: {
                enabled: false // Disable tooltips since we show labels
            },
            datalabels: {
                color: '#fff',
                font: {
                    family: 'Poppins',
                    weight: 'bold',
                    size: 11
                },
                formatter: (value, ctx) => {
                    const percentage = ((value / totalExpenses) * 100).toFixed(0);
                    return percentage > 5 ? `${percentage}%` : ''; // Only show if > 5% to avoid clutter
                },
                textShadowBlur: 4,
                textShadowColor: 'rgba(0,0,0,0.5)'
            }
        },
        cutout: '60%', // Make it slightly thicker for labels
    };

    return (
        <div className="flex justify-center h-72 relative">
             {Object.keys(categoryTotals).length > 0 ? (
                <>
                    <Doughnut data={data} options={options} />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center">
                            <p className="text-gray-400 text-xs uppercase">Total</p>
                            <p className="text-2xl font-bold text-white">₹{totalExpenses}</p>
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center text-gray-500">
                    <p>No expenses yet</p>
                </div>
            )}
        </div>
    );
};

export default ExpensesChart;
