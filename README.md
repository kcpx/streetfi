# StreetFi

Financial calculators and education platform with Firebase authentication.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the app
npm start
```

## Firebase Setup (Required)

Your Firebase config is already in `src/firebase.js`. You just need to enable two things:

### 1. Enable Authentication
- Go to: https://console.firebase.google.com/project/leverfinance-f8b0a/authentication
- Click "Get Started"
- Click "Email/Password" 
- Toggle to "Enable"
- Click "Save"

### 2. Create Firestore Database
- Go to: https://console.firebase.google.com/project/leverfinance-f8b0a/firestore
- Click "Create database"
- Choose "Start in test mode"
- Select location (us-central or close to you)
- Click "Enable"

## Test It

1. App opens at http://localhost:3000
2. Click "Login" (top right)
3. Click "Sign up"
4. Enter: test@example.com / password123
5. Go to any calculator
6. Click "Save This Calculation"
7. Check Firebase Console → see your saved data!

## Features

- **Calculators:**
  - Leverage Trading (with P&L, risk analysis, scenarios)
  - Mortgage & Real Estate
  - Stock Options & QSBS
  - Stock Sale Tax
  - 83(b) Election
  - Rental Property ROI
  - Cost Segregation
  - Financial Planning with Monte Carlo

- **Authentication:**
  - Sign up / Login
  - Save calculations
  - User dashboard
  - Persistent sessions

## Project Structure

```
streetfi/
├── public/
│   └── index.html
├── src/
│   ├── firebase.js          # Firebase config
│   ├── StreetFi.jsx         # Main app component
│   ├── App.js               # App wrapper
│   ├── index.js             # React entry point
│   └── index.css            # Tailwind styles
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Troubleshooting

**"Module not found: firebase"**
→ Run: `npm install`

**"Weak password" error**
→ Use at least 6 characters

**Can't save calculations**
→ Make sure you're logged in & Firestore is created

**Still stuck?**
→ Check browser console (F12) for errors
