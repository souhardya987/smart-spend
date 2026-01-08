import { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthContext from './context/AuthContext';
import { getTransactions, addTransaction, deleteTransaction } from './api';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import ExpensesChart from './components/ExpensesChart';
import GeminiAdvisor from './components/GeminiAdvisor';
import Login from './components/Login';
import Register from './components/Register';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    
    if(loading) return <div className="text-center p-10">Loading...</div>;
    
    return user ? children : <Navigate to="/login" />;
};

const MainApp = () => {
    const { user, logout } = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        if(user) fetchTransactions();
    }, [user]);

    const fetchTransactions = async () => {
        try {
            const { data } = await getTransactions();
            setTransactions(data.data);
        } catch (error) {
            console.error("Error fetching transactions", error);
        }
    };

    const handleAddTransaction = async (newTransaction) => {
        try {
            const { data } = await addTransaction(newTransaction);
            setTransactions([...transactions, data.data]);
        } catch (error) {
            console.error("Error adding transaction", error);
        }
    };

    const handleDeleteTransaction = async (id) => {
         try {
            await deleteTransaction(id);
            setTransactions(transactions.filter(t => t._id !== id));
         } catch (error) {
            console.error("Error deleting transaction", error);
         }
    };

    return (
        <div className="min-h-screen text-gray-100 p-4 font-sans selection:bg-indigo-500 selection:text-white">
          <div className="max-w-7xl mx-auto space-y-8">
            <header className="flex justify-between items-center glass p-6 rounded-2xl">
                <div>
                    <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 tracking-tight">Smart Spend</h1>
                    <p className="text-gray-400 text-sm mt-1">Welcome back, <span className="text-white font-semibold">{user?.name}</span></p>
                </div>
                <button 
                    onClick={logout}
                    className="bg-red-500/20 hover:bg-red-500/40 text-red-300 border border-red-500/50 px-6 py-2 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm"
                >
                    Logout
                </button>
            </header>
    
            {/* Dashboard Summary */}
            <Dashboard transactions={transactions} />
    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    {/* Add Transaction */}
                    <div className="glass-card p-6 rounded-3xl hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-500">
                        <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">Add Transaction</h2>
                        <TransactionForm onAdd={handleAddTransaction} />
                    </div>
                    
                    {/* Lists */}
                     <div className="glass-card p-6 rounded-3xl">
                        <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">History</h2>
                        <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />
                    </div>
                </div>
    
                <div className="space-y-6">
                    {/* AI Advisor */}
                    <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 p-1 rounded-3xl shadow-2xl">
                         <div className="bg-gray-900/50 backdrop-blur-xl p-6 rounded-[22px]">
                            <h2 className="text-2xl font-bold mb-4 text-white">Smart Advisor</h2>
                            <GeminiAdvisor transactions={transactions} />
                        </div>
                    </div>
    
                    {/* Charts */}
                     <div className="glass-card p-6 rounded-3xl">
                        <h2 className="text-2xl font-bold mb-6 text-gray-100">Analytics</h2>
                        <ExpensesChart transactions={transactions} />
                    </div>
                </div>
            </div>
          </div>
        </div>
    );
};

const PublicRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    
    if(loading) return <div className="text-center p-10">Loading...</div>;
    
    return user ? <Navigate to="/" /> : children;
};

function App() {
  return (
    <AuthProvider>
        <Router>
            <Routes>
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
                <Route path="/" element={
                    <PrivateRoute>
                        <MainApp />
                    </PrivateRoute>
                } />
            </Routes>
        </Router>
    </AuthProvider>
  );
}

export default App;
