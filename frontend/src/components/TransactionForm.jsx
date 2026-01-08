import React, { useState } from 'react';

const TransactionForm = ({ onAdd }) => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('Other');
    const [type, setType] = useState('expense'); // expense or income

    const onSubmit = (e) => {
        e.preventDefault();
        const val = parseFloat(amount);
        const finalAmount = type === 'expense' ? -Math.abs(val) : Math.abs(val);
        
        const newTransaction = {
            text,
            amount: finalAmount,
            category
        };

        onAdd(newTransaction);
        setText('');
        setAmount(0);
        setCategory('Other');
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <input 
                    type="text" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    placeholder="Enter description..." 
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    required
                />
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div>
                     <label className="block text-sm font-medium text-gray-300 mb-1">Amount</label>
                    <input 
                        type="number" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        placeholder="0" 
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        required
                    />
                </div>
                 <div>
                     <label className="block text-sm font-medium text-gray-300 mb-1">Type</label>
                     <select 
                        value={type} 
                        onChange={(e) => setType(e.target.value)}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none"
                    >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                     </select>
                </div>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                 <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                >
                    <option value="Food">Food</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Transport">Transport</option>
                    <option value="Health">Health</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Salary">Salary</option>
                    <option value="Investment">Investment</option>
                    <option value="Other">Other</option>
                 </select>
            </div>
            
            <button 
                type="submit" 
                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02] transition-all duration-200"
            >
                Add Transaction
            </button>
        </form>
    );
};

export default TransactionForm;
