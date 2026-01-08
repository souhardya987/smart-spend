import React, { useState } from 'react';
import { getGeminiAdvice } from '../api';
import { FaRobot } from 'react-icons/fa';

const GeminiAdvisor = ({ transactions }) => {
    const [advice, setAdvice] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGetAdvice = async () => {
        setLoading(true);
        try {
            const { data } = await getGeminiAdvice(transactions);
            setAdvice(data.data);
        } catch (error) {
            const msg = error.response?.data?.error || "Sorry, I couldn't connect to the financial brain right now. Check your API key.";
            setAdvice(msg);
        }
        setLoading(false);
    };

    return (
        <div className="space-y-4">
             <p className="text-indigo-100 text-sm">
                Get personalized insights on your spending habits and saving tips by AI.
            </p>
            
            {!advice && (
                <button 
                    onClick={handleGetAdvice} 
                    disabled={loading || transactions.length === 0}
                    className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-white text-indigo-600 rounded-lg font-bold hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FaRobot />
                    <span>{loading ? 'Analyzing...' : 'Ask AI Advisor'}</span>
                </button>
            )}

            {advice && (
                <div className="bg-white/10 p-4 rounded-lg text-sm text-indigo-50 leading-relaxed animate-fade-in border border-white/20">
                     <div className="markdown-prose" dangerouslySetInnerHTML={{ __html: advice.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                     
                     <button 
                        onClick={() => setAdvice('')}
                        className="mt-3 text-xs text-indigo-200 hover:text-white underline"
                    >
                        Clear Advice
                     </button>
                </div>
            )}
        </div>
    );
};

export default GeminiAdvisor;
