import React from 'react';
import { FaTrash } from 'react-icons/fa';

const TransactionList = ({ transactions, onDelete }) => {
    return (
        <ul className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {transactions.map(transaction => (
                <li key={transaction._id} className={`flex justify-between items-center bg-gray-50 p-3 rounded-lg border-r-4 ${transaction.amount < 0 ? 'border-red-500' : 'border-green-500'} shadow-sm hover:bg-gray-100 transition-colors`}>
                    <div>
                        <p className="font-semibold text-gray-800">{transaction.text}</p>
                        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">{transaction.category}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className={`font-bold ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {transaction.amount < 0 ? '-' : '+'}₹{Math.abs(transaction.amount)}
                        </span>
                        <button onClick={() => onDelete(transaction._id)} className="text-gray-400 hover:text-red-500 transition-colors">
                            <FaTrash />
                        </button>
                    </div>
                </li>
            ))}
            {transactions.length === 0 && <p className="text-center text-gray-400 py-4">No transactions yet.</p>}
        </ul>
    );
};

export default TransactionList;
