import axios from 'axios';

const api = axios.create({
    baseURL: '/api'
});

// Add a request interceptor to inject the token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const getTransactions = () => api.get('/transactions');
export const addTransaction = (transaction) => api.post('/transactions', transaction);
export const deleteTransaction = (id) => api.delete(`/transactions/${id}`);
export const getGeminiAdvice = (transactions) => api.post('/gemini', { transactions });

export default api;
