import React from 'react';

const Dashboard = ({ transactions }) => {
    const amounts = transactions.map(transaction => Number(transaction.amount));
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card p-6 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <div className="w-24 h-24 bg-blue-400 rounded-full blur-2xl"></div>
                </div>
                <h3 className="text-blue-300 text-sm uppercase font-bold tracking-wider">Your Balance</h3>
                <p className={`text-4xl font-extrabold mt-2 ${total < 0 ? 'text-red-400' : 'text-white'}`}>₹{total}</p>
            </div>
            <div className="glass-card p-6 rounded-3xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <div className="w-24 h-24 bg-green-400 rounded-full blur-2xl"></div>
                </div>
                 <h3 className="text-emerald-300 text-sm uppercase font-bold tracking-wider">Income</h3>
                <p className="text-4xl font-extrabold mt-2 text-emerald-400">+₹{income}</p>
            </div>
            <div className="glass-card p-6 rounded-3xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <div className="w-24 h-24 bg-red-400 rounded-full blur-2xl"></div>
                </div>
                 <h3 className="text-rose-300 text-sm uppercase font-bold tracking-wider">Expenses</h3>
                <p className="text-4xl font-extrabold mt-2 text-rose-400">-₹{expense}</p>
            </div>
        </div>
    );
};

export default Dashboard;
