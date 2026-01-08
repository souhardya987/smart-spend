const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// @desc    Get financial advice from Gemini
// @route   POST /api/gemini
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { transactions } = req.body;

        // Initialize Gemini
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Prepare prompt
        const prompt = `
            You are a smart financial advisor. Analyze the following transactions and provide insights.
            Transactions: ${JSON.stringify(transactions)}
            
            Please provide:
            1. Total balance analysis.
            2. Expense pattern analysis (where is the money going?).
            3. Smart suggestions on how to save money based on these categories.
            4. A short encouragement or warning if spending is too high.
            
            Keep the response concise and formatted in simple markdown list or headers.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return res.status(200).json({
            success: true,
            data: text
        });

    } catch (err) {
        console.error("Gemini API Error:", err);
        return res.status(500).json({
            success: false,
            error: err.message || 'AI Generation Failed'
        });
    }
});

module.exports = router;
