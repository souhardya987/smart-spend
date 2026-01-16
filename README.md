# 💸 Smart Spend – Smart Finance Tracker

Smart Spend is a **full-stack personal finance tracker** that helps users manage income and expenses securely while gaining intelligent insights into their spending patterns. The application combines a modern React frontend with a scalable Node.js backend and integrates **AI-powered financial insights using the Gemini API**.

---

## 🚀 Features

- 🔐 **Secure Authentication**
  - User authentication using **JWT** and password hashing with **bcrypt.js**
- 💰 **Income & Expense Management**
  - Add, update, delete, and categorize transactions
- 📊 **Visual Analytics**
  - Interactive charts for category-wise spending, trends, and summaries
- 🤖 **AI-Powered Insights**
  - Uses **Gemini API** to generate intelligent financial insights from user data
- 🌐 **Modern UI**
  - Responsive, mobile-friendly interface built with **React + Tailwind CSS**
- ⚡ **Scalable Backend**
  - RESTful APIs with **Node.js, Express, and MongoDB**

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Chart.js & React-Chartjs-2
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcrypt.js
- Gemini AI (`@google/generative-ai`)
- dotenv
- CORS

---

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/souhardya987/smart-spend.git
cd smart-spend
```

### Backend setup
```
cd backend
npm install
npm run dev
.env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key

```
### Frontend setup
```
cd frontend
npm install
npm run dev
```

