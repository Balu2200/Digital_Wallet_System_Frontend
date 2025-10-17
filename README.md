# PaySwift - Digital Payment Platform# PayVault - Digital Payment Platform 💰

> A modern, secure digital wallet application built with React and Tailwind CSS> A modern, secure, and feature-rich digital wallet application for seamless financial transactions

## 🚀 Quick Start[![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)

[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)

### Prerequisites[![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen.svg)](https://www.mongodb.com/)

- Node.js (v16+)[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com/)

- npm or yarn

## 📋 Table of Contents

### Installation

- [Overview](#overview)

````bash- [Features](#features)

# Install dependencies- [Tech Stack](#tech-stack)

npm install- [Design System](#design-system)

- [Getting Started](#getting-started)

# Start development server- [API Documentation](#api-documentation)

npm run dev- [Project Structure](#project-structure)

- [Analytics Feature](#analytics-feature)

# Build for production- [UI/UX Highlights](#uiux-highlights)

npm run build- [Contributing](#contributing)

```- [License](#license)



The app will run on `http://localhost:5173`---



## 🛠️ Tech Stack## 🎯 Overview



- **React 19.0.0** - Modern UI libraryPayVault is a full-stack fintech web application built using the MERN (MongoDB, Express, React, Node.js) stack with Tailwind CSS for modern, responsive styling. The platform enables users to transfer money securely, manage accounts, view transaction history, schedule automatic payments, analyze financial data through interactive dashboards, and get assistance through an AI-powered chatbot.

- **React Router DOM 7.1.5** - Client-side routing

- **Tailwind CSS 3.4** - Utility-first CSS framework---

- **Axios** - HTTP client

- **Vite 6.1** - Build tool## ✨ Features

- **Heroicons** - Icon library

### 🔐 User Authentication & Security

## ✨ Key Features

- **JWT-based authentication & authorization**: Secure access control for all user operations

### 🔐 Authentication & Security- **Email OTP verification**: Two-factor authentication for enhanced security

- JWT-based authentication- **PIN-based transaction verification**: Additional security layer for money transfers

- Email OTP verification- **Data sanitization and input validation**: Protection against malicious inputs and SQL injection

- PIN-protected transactions- **Secure cookie-based session management**: HttpOnly cookies for token storage

- Secure session management

### 💸 Money Transfer & Account Management

### 💸 Financial Operations

- Instant money transfers- **Instant user-to-user money transfers**: Send money to any registered user instantly

- Real-time balance updates- **PIN-protected transactions**: Every transfer requires PIN verification

- Transaction history- **Real-time balance updates**: See your balance change instantly after transactions

- Add balance functionality- **Transaction history with pagination**: View all your past transactions with detailed records

- User search- **Add balance functionality**: Top up your wallet easily

- **Search users by name**: Quick search to find recipients

### ⚡ AutoPay

- Schedule recurring payments (daily/weekly/monthly)### ⚡ AutoPay (Scheduled Payments)

- Manage scheduled payments

- Next payment date tracking- **Recurring payment scheduling**: Set up automatic payments (daily, weekly, monthly)

- **Payment management dashboard**: View and manage all scheduled payments

### 📊 Analytics Dashboard- **Easy cancellation**: Delete scheduled payments anytime

- **Line Chart**: Balance trend over time- **Next payment date tracking**: Know exactly when your next payment will execute

- **Area Chart**: Income vs expenses comparison- **Recipient management**: Choose from your contact list

- **Enhanced Bar Chart**: Monthly transaction breakdown- **Success notifications**: Get confirmation messages for all AutoPay activities

- **Donut Charts**: Transaction success rate & spending by category

- **Weekly Heatmap**: Transaction intensity by day/hour### 📊 Analytics & Insights

- **Key Metrics**: Balance, sent, received, net cash flow

- **Financial Overview Dashboard**: Comprehensive view of your financial health

### 💬 AI Chatbot- **Visual Charts & Graphs**:

- Floating chat interface  - Monthly trends (sent vs received)

- Real-time assistance  - Transaction success/failure pie chart

- Common query support  - Top recipients bar chart

  - Recent activity timeline

### 🎨 Professional UI/UX- **Key Metrics**:

- Full-width responsive navbar with dropdown menus  - Current balance

- Active link highlighting  - Total money sent/received

- Mobile-responsive menu  - Net cash flow

- Profile management with avatar  - Transaction success rate

- Two-step verification toggle- **Interactive visualizations**: Built with pure CSS/SVG (no external chart libraries)

- Modern card-based layouts- **Responsive charts**: Adapt to all screen sizes

- Smooth animations

- Consistent error handling### 💬 AI Chatbot Assistance



## 📁 Project Structure- **Floating chat interface**: Always accessible from any page

- **Rule-based decision tree**: Quick and accurate responses

```- **Common queries support**:

Frontend/  - Balance inquiries

├── src/  - Transaction details

│   ├── components/      # Reusable UI components  - How-to guides

│   │   ├── Appbar.jsx           # Navigation bar  - Troubleshooting

│   │   ├── Balance.jsx          # Balance display- **Professional UI**: Modern chat interface with bot avatar

│   │   ├── Button.jsx           # Reusable buttons- **Real-time responses**: Instant answers to your questions

│   │   ├── ErrorAlert.jsx       # Error/success alerts

│   │   ├── Footer.jsx           # Footer component### 🎨 Modern UI/UX

│   │   ├── InputBox.jsx         # Form inputs

│   │   └── Users.jsx            # User list/grid- **Clean, minimal design**: Three-color theme (Indigo, Slate, Emerald)

│   ├── pages/          # Application pages- **Floating navigation bar**: Modern glassmorphism effect

│   │   ├── Analytics.jsx        # Analytics dashboard- **Grid-based contact layout**: Beautiful card-based user directory

│   │   ├── Dashboard.jsx        # Main dashboard- **Professional search bar**: Fast and intuitive user search

│   │   ├── Profile.jsx          # User profile & settings- **Responsive design**: Works perfectly on all devices

│   │   ├── login.jsx            # Login page- **Smooth animations**: Polished transitions throughout

│   │   ├── signup.jsx           # Signup page- **Dark mode support**: Eye-friendly interface (optional)

│   │   ├── Otp.jsx              # OTP verification

│   │   ├── transaction.jsx      # Send money---

│   │   ├── addbalance.jsx       # Add balance

│   │   ├── transactionsHistory.jsx  # Transaction list## 🛠️ Tech Stack

│   │   ├── autopay.jsx          # AutoPay management

│   │   └── privateRoute.jsx    # Route protection### Frontend

│   ├── utils/          # Utilities

│   │   ├── constants.jsx        # API constants- **React 19.0.0**: Modern UI library with hooks

│   │   └── Usercontext.jsx      # Global state- **React Router DOM 7.1.5**: Client-side routing

│   ├── App.jsx         # Main app component- **Axios**: HTTP client for API requests

│   ├── main.jsx        # React entry point- **Tailwind CSS 3.4**: Utility-first CSS framework

│   └── index.css       # Global styles- **Vite 6.1**: Next-generation frontend tooling

├── public/             # Static assets- **React Icons**: Icon library

├── index.html

├── tailwind.config.js  # Tailwind configuration### Backend

├── vite.config.js      # Vite configuration

└── package.json- **Node.js**: JavaScript runtime

```- **Express.js**: Web application framework

- **MongoDB**: NoSQL database

## 🎨 Design System- **Mongoose**: MongoDB object modeling

- **JWT**: JSON Web Tokens for authentication

### Color Palette- **Bcrypt**: Password hashing

- **Primary (Indigo)**: `#6366f1` - Main actions, links- **Nodemailer**: Email service for OTP

- **Accent (Emerald)**: `#10b981` - Success states, income- **Node-cron**: Task scheduler for AutoPay

- **Secondary (Slate)**: `#64748b` - Text, borders

- **Error (Red)**: `#ef4444` - Errors, expenses### Development Tools



### Key Components- **ESLint**: Code linting

- **ErrorAlert**: Reusable alert component (error/success/warning/info)- **PostCSS**: CSS processing

- **Card**: Standard card with shadow and rounded corners- **Autoprefixer**: CSS vendor prefixing

- **Button**: Primary, secondary, and ghost variants

- **Input**: Consistent form inputs with validation states---



## 🔧 Configuration## 🎨 Design System



### Environment Variables### Color Palette

Create a `.env` file in the root:

```javascript

```env// Primary - Indigo

VITE_API_URL=http://localhost:3000primary: {

```  50: '#eef2ff',

  100: '#e0e7ff',

### API Endpoints  200: '#c7d2fe',

Base URL is configured in `src/utils/constants.jsx`  300: '#a5b4fc',

  400: '#818cf8',

```javascript  500: '#6366f1',

export const BASE_URL = "http://localhost:3000";  600: '#4f46e5',  // Main primary

```  700: '#4338ca',

  800: '#3730a3',

## 📊 Analytics Features  900: '#312e81',

}

The Analytics page includes professional data visualizations:

// Secondary - Slate

1. **Balance Trend Line Chart** - Shows balance fluctuation over 6 monthssecondary: {

2. **Income vs Expenses Area Chart** - Dual-layer comparison with gradients  50: '#f8fafc',

3. **Monthly Comparison Bar Chart** - Side-by-side bars for received/sent  100: '#f1f5f9',

4. **Transaction Success Donut** - Success rate with percentage breakdown  200: '#e2e8f0',

5. **Spending by Category Donut** - Multi-segment spending distribution  300: '#cbd5e1',

6. **Weekly Activity Heatmap** - GitHub-style heatmap showing transaction intensity  400: '#94a3b8',

  500: '#64748b',

All charts are built with pure SVG/CSS for optimal performance.  600: '#475569',

  700: '#334155',

## 🔒 Security Features  800: '#1e293b',

  900: '#0f172a',

- JWT token storage in secure cookies}

- PIN verification for transactions

- Input validation and sanitization// Accent - Emerald

- Protected routes with authentication checksaccent: {

- Error handling with user-friendly messages  50: '#ecfdf5',

  100: '#d1fae5',

## 📱 Responsive Design  200: '#a7f3d0',

  300: '#6ee7b7',

- **Mobile**: Single column layout, hamburger menu  400: '#34d399',

- **Tablet**: Two-column grid, expanded navbar  500: '#10b981',  // Main accent

- **Desktop**: Full grid layouts, dropdown menus  600: '#059669',

- **Large screens**: Optimized spacing and layout  700: '#047857',

  800: '#065f46',

## 🤝 Contributing  900: '#064e3b',

}

1. Fork the repository```

2. Create a feature branch (`git checkout -b feature/AmazingFeature`)

3. Commit your changes (`git commit -m 'Add AmazingFeature'`)### Typography

4. Push to branch (`git push origin feature/AmazingFeature`)

5. Open a Pull Request- **Font Family**: Inter (Google Fonts)

- **Headings**: Bold, large sizes with tight tracking

## 📄 License- **Body**: Regular weight, comfortable line height

- **Code**: Monospace for technical content

This project is licensed under the MIT License.

### Component Classes

## 👨‍💻 Author

```css

**Balu Pasumarthi** - [@Balu2200](https://github.com/Balu2200)/* Buttons */

.btn-primary    // Primary action button

## 📧 Support.btn-secondary  // Secondary action button

.btn-ghost      // Minimal ghost button

For support or questions, create an issue on GitHub.

/* Cards */

---.card           // Standard card container

.card-hover     // Card with hover effects

**Built with ❤️ using React, Tailwind CSS, and Vite**

/* Inputs */

*Last Updated: October 17, 2025*.input-field    // Text input styling

.input-error    // Error state input

/* Badges */
.badge-success  // Success status
.badge-pending  // Pending status
.badge-error    // Error status;
````

### Spacing & Layout

- **Border Radius**:
  - `rounded-button`: 0.5rem (8px)
  - `rounded-card`: 1rem (16px)
  - `rounded-lg`: 0.75rem (12px)
- **Shadows**:
  - `shadow-soft`: Subtle elevation
  - `shadow-medium`: Standard elevation
  - `shadow-strong`: High elevation

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Balu2200/PayVault.git
cd PayVault
```

2. **Install Backend Dependencies**

```bash
cd Backend
npm install
```

3. **Install Frontend Dependencies**

```bash
cd ../Frontend
npm install
```

### Environment Variables

Create a `.env` file in the **Backend** directory:

```env
# Database
MONGO_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret_key

# Server
PORT=3000

# Email Service (for OTP)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### Running the Application

1. **Start MongoDB** (if running locally)

```bash
mongod
```

2. **Start Backend Server**

```bash
cd Backend
npm start
```

The backend will run on `http://localhost:3000`

3. **Start Frontend Development Server**

```bash
cd Frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

4. **Access the Application**
   Open your browser and navigate to `http://localhost:5173`

---

## 📡 API Documentation

### Authentication Endpoints

| Endpoint      | Method | Description                  | Auth Required |
| ------------- | ------ | ---------------------------- | ------------- |
| `/signup`     | POST   | User registration with email | No            |
| `/login`      | POST   | User login with credentials  | No            |
| `/verify-otp` | POST   | Verify OTP sent to email     | No            |

**Request Body (Signup)**:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "pin": "1234"
}
```

### Account Endpoints

| Endpoint                | Method | Description             | Auth Required |
| ----------------------- | ------ | ----------------------- | ------------- |
| `/account/balance`      | GET    | Get current balance     | Yes           |
| `/account/update`       | PUT    | Add money to account    | Yes (+ PIN)   |
| `/account/transfer`     | POST   | Transfer money to user  | Yes (+ PIN)   |
| `/account/transactions` | GET    | Get transaction history | Yes           |
| `/account/analytics`    | GET    | Get financial analytics | Yes           |
| `/account/pin`          | PUT    | Update account PIN      | Yes           |

**Request Body (Transfer)**:

```json
{
  "to": "userId",
  "amount": 100,
  "pin": "1234"
}
```

### Profile Endpoints

| Endpoint        | Method | Description          | Auth Required |
| --------------- | ------ | -------------------- | ------------- |
| `/profile/view` | GET    | Get user profile     | Yes           |
| `/profile/bulk` | GET    | Search users by name | Yes           |

**Query Params (Search)**:

```
GET /profile/bulk?filter=john
```

### AutoPay Endpoints

| Endpoint                 | Method | Description                | Auth Required |
| ------------------------ | ------ | -------------------------- | ------------- |
| `/schedule-payment`      | POST   | Schedule recurring payment | Yes           |
| `/scheduled-payments`    | GET    | Get all scheduled payments | Yes           |
| `/scheduled-payment/:id` | DELETE | Cancel scheduled payment   | Yes           |

**Request Body (Schedule)**:

```json
{
  "recipient": "userId",
  "recipientName": "John Doe",
  "amount": 500,
  "frequency": "monthly",
  "nextExecutionDate": "2025-11-01T10:00:00Z"
}
```

### Chatbot Endpoints

| Endpoint           | Method | Description             | Auth Required |
| ------------------ | ------ | ----------------------- | ------------- |
| `/chatbot/message` | POST   | Send message to chatbot | Yes           |

**Request Body**:

```json
{
  "question": "How do I check my balance?"
}
```

---

## 📁 Project Structure

```
PayVault/
├── Backend/
│   ├── src/
│   │   ├── app.js                 # Express app setup
│   │   ├── config/
│   │   │   └── database.js        # MongoDB connection
│   │   ├── middleware/
│   │   │   ├── auth.js            # JWT authentication
│   │   │   └── verifyPin.js       # PIN verification
│   │   ├── models/
│   │   │   ├── user.js            # User schema
│   │   │   ├── account.js         # Account schema
│   │   │   ├── transactions.js    # Transaction schema
│   │   │   ├── payment.js         # Scheduled payment schema
│   │   │   └── chatbot.js         # Chatbot data schema
│   │   ├── routes/
│   │   │   ├── auth.js            # Auth routes
│   │   │   ├── account.js         # Account routes
│   │   │   ├── profile.js         # Profile routes
│   │   │   ├── shedulePayment.js  # AutoPay routes
│   │   │   └── botRoute.js        # Chatbot routes
│   │   └── utils/
│   │       ├── paymentScheduler.js # Cron jobs
│   │       ├── seedChatbot.js      # Chatbot data
│   │       └── validate.js         # Input validation
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── App.jsx                # Main app component
    │   ├── main.jsx              # React entry point
    │   ├── index.css             # Global styles
    │   ├── components/
    │   │   ├── Appbar.jsx        # Navigation bar
    │   │   ├── Balance.jsx       # Balance display
    │   │   ├── Button.jsx        # Reusable button
    │   │   ├── Footer.jsx        # Footer component
    │   │   ├── InputBox.jsx      # Form input
    │   │   ├── Users.jsx         # User list/grid
    │   │   └── FloatingChatbot.jsx # Chat widget
    │   ├── pages/
    │   │   ├── Body.jsx          # Layout wrapper
    │   │   ├── Dashboard.jsx     # Main dashboard
    │   │   ├── login.jsx         # Login page
    │   │   ├── signup.jsx        # Signup page
    │   │   ├── Otp.jsx           # OTP verification
    │   │   ├── transaction.jsx   # Send money page
    │   │   ├── addbalance.jsx    # Add balance page
    │   │   ├── transactionsHistory.jsx # Transaction list
    │   │   ├── autopay.jsx       # AutoPay management
    │   │   ├── Analytics.jsx     # Analytics dashboard
    │   │   ├── chatbot.jsx       # Chatbot page (legacy)
    │   │   └── privateRoute.jsx  # Route protection
    │   └── utils/
    │       ├── constants.jsx     # API URL constants
    │       └── Usercontext.jsx   # Global user state
    ├── public/                   # Static assets
    ├── index.html
    ├── tailwind.config.js        # Tailwind configuration
    ├── vite.config.js            # Vite configuration
    └── package.json
```

---

## 📊 Analytics Feature

### Overview

The Analytics feature provides comprehensive visual insights into financial activities, spending patterns, and transaction trends.

### Components

#### 1. **Stat Cards** (4 metrics)

- Current Balance (Indigo)
- Total Money Sent (Red)
- Total Money Received (Green)
- Net Cash Flow (Dynamic color)

#### 2. **Monthly Trends Chart**

- Horizontal bar chart
- Last 6 months comparison
- Sent vs Received visualization
- Auto-scaling based on max values

#### 3. **Transaction Overview**

- Donut chart showing success/failure ratio
- Total transaction count in center
- Color-coded legend

#### 4. **Top Recipients**

- Top 5 recipients by amount
- Horizontal progress bars
- Name and total amount display

#### 5. **Recent Activity**

- Last 10 transactions
- Type indicators (sent/received)
- Amount and status display
- Date timestamps

### Technical Implementation

- **No External Chart Libraries**: Built with pure CSS and SVG
- **Single API Call**: Efficient data fetching
- **Responsive Design**: Adapts to all screen sizes
- **Real-time Calculations**: Client-side metric computation
- **Smooth Animations**: 500ms transitions on charts

### Color Coding

| Metric   | Color  | Usage                   |
| -------- | ------ | ----------------------- |
| Balance  | Indigo | Current balance         |
| Sent     | Red    | Outgoing money          |
| Received | Green  | Incoming money          |
| Success  | Green  | Successful transactions |
| Failed   | Red    | Failed transactions     |

---

## 🎯 UI/UX Highlights

### Modern Design Principles

1. **Floating Navigation**

   - Glassmorphism effect with backdrop blur
   - Rounded corners for modern feel
   - Responsive icon/text display
   - Smooth hover animations

2. **Grid-Based Layouts**

   - Contact cards in responsive grid (1-4 columns)
   - Click-to-navigate entire cards
   - Visual feedback on hover
   - Avatar with online indicators

3. **Professional Search**

   - Centered, prominent search bar
   - Icon positioning inside input
   - Smooth focus states
   - Real-time filtering

4. **Floating Chatbot**

   - Toggle button in bottom-right
   - Slide-in animation
   - Compact 600px interface
   - Always accessible across pages

5. **Consistent Cards**
   - Unified padding and spacing
   - Subtle shadows for depth
   - Hover effects where interactive
   - Clear visual hierarchy

### Responsive Breakpoints

```css
/* Mobile First */
sm: '640px'   // Small tablets
md: '768px'   // Tablets
lg: '1024px'  // Laptops
xl: '1280px'  // Desktops
2xl: '1536px' // Large screens
```

### Accessibility Features

- Semantic HTML structure
- ARIA labels on buttons
- Keyboard navigation support
- Focus visible states
- Color contrast compliance

---

## 🔒 Security Features

1. **Authentication**

   - JWT tokens with expiration
   - HttpOnly cookies prevent XSS
   - Secure password hashing with bcrypt
   - OTP verification for sensitive actions

2. **Transaction Security**

   - PIN verification for transfers
   - Transaction session management
   - Rollback on failure
   - Balance validation before transfer

3. **Data Protection**
   - Input sanitization
   - SQL injection prevention
   - Rate limiting on API endpoints
   - CORS configuration

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] User can sign up with valid credentials
- [ ] OTP verification works correctly
- [ ] User can login with correct credentials
- [ ] Dashboard shows correct balance
- [ ] Money transfer completes successfully
- [ ] Transaction history displays correctly
- [ ] AutoPay schedules payment properly
- [ ] Analytics displays accurate data
- [ ] Chatbot responds to queries
- [ ] Responsive design works on mobile
- [ ] Error messages display properly
- [ ] Loading states show correctly

---

## 🚧 Future Enhancements

### Planned Features

1. **Advanced Analytics**

   - Custom date range filters
   - Export reports as PDF/CSV
   - Spending categories and budgets
   - Predictive insights

2. **Social Features**

   - Split bill functionality
   - Request money from users
   - Group payments
   - Payment QR codes

3. **Notifications**

   - Push notifications for transactions
   - Email alerts for large transfers
   - Spending threshold warnings
   - AutoPay execution confirmations

4. **Enhanced Security**

   - Biometric authentication
   - 2FA via authenticator apps
   - Transaction alerts
   - Device management

5. **Additional Features**
   - Multiple currency support
   - International transfers
   - Bill payments
   - Investment options

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Balu Pasumarthi** - [@Balu2200](https://github.com/Balu2200)

---

## 📧 Support

For support, questions, or feedback:

- Email: support@payvault.com
- GitHub Issues: [Create an issue](https://github.com/Balu2200/PayVault/issues)

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS
- MongoDB for the flexible database
- Express.js for the robust backend
- All contributors and testers

---

## 📸 Screenshots

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Analytics

![Analytics](screenshots/analytics.png)

### Transactions

![Transactions](screenshots/transactions.png)

### AutoPay

![AutoPay](screenshots/autopay.png)

---

**Built with ❤️ using React, Node.js, MongoDB, and Tailwind CSS**

---

_Last Updated: October 17, 2025_

````

## Workings

### Backend

- **Node.js & Express**: The backend server is built using Node.js and Express, providing a robust and scalable foundation.
- **MongoDB**: A NoSQL database is used to store user data, transaction history, and other relevant information.
- **JWT & OTP**: Implements JSON Web Tokens for authentication and OTP for secure login.

#### API Endpoints

| Endpoint                | Method | Description                              |
|-------------------------|--------|------------------------------------------|
| /auth/signup            | POST   | User registration with OTP verification  |
| /auth/login             | POST   | User login with JWT authentication       |
| /auth/verify-otp        | POST   | For verification  of OTP                 |
| /account/transactions   | GET    | Get transaction history                  |
| /account/transfer       | POST   | Transfer money between users             |
| /schedule-payment       | POST   | Schedule an automatic payment            |
| /scheduled-payments     | GET    | Retrieve scheduled payments              |
| /scheduled-payment/:id  | DELETE | Cancel a scheduled payment               |
| /account/balance        | GET    | Getting the account balance              |
| /account/update         | GET    | To update the account balance            |
| /account/transactions   | GET    | Getting the account all transactions     |
| /chatbot/message        | POST   | Chatbot API                              |


### Frontend

- **React**: The frontend is developed using React, offering a dynamic and responsive user interface.
- **Tailwind CSS**: Utilized for styling, ensuring a modern and consistent look across the application.

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- npm (Node Package Manager)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Balu2200/Payswift_Frontend.git
    ```
2. Navigate to the project directory:
    ```bash
    cd payswift
    ```
3. Install dependencies for both backend and frontend:
    ```bash
    npm install
    cd client
    npm install
    ```

### Running the Application

1. Start the backend server:
    ```bash
    npm run server
    ```
2. Start the frontend development server:
    ```bash
    cd client
    npm start
    ```

### Environment Variables

Create a `.env` file in the root directory and add the following variables:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=
EMAIL_USER=
EMAIL_PASS=
```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or support, please contact us at support@payswift.com.
````
