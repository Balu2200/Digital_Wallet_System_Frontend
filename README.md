# PaySwift Payment App 💰

## Overview

This is a full-stack Fintech web application built using the MERN (MongoDB, Express, React, Node.js) stack with Tailwind CSS for styling. The platform enables users to transfer money, manage accounts, view transaction history, schedule automatic payments, and interact with an AI-powered chatbot for assistance.

## Features

### ✅ User Authentication & Security

- **JWT-based authentication & authorization**: Ensures secure access to the application.
- **Email OTP verification**: Adds an extra layer of security during login/signup.
- **Data sanitization and input validation**: Protects against malicious inputs and ensures data integrity.

### ✅ Money Transfer & Account Management

- **User-to-user secure money transfers with PIN number**: Facilitates safe and secure transactions between users.
- **Balance management with transaction limits**: Allows users to manage their account balance and set transaction limits.
- **Transaction history with detailed records**: Provides a comprehensive view of all past transactions.

### ✅ AutoPay (Scheduled Payments)

- **Set up recurring payments (daily, weekly, monthly)**: Users can schedule automatic payments at their convenience.
- **View and manage scheduled payments**: Easily track and modify scheduled payments.
- **Delete scheduled payments when no longer needed**: Remove any unnecessary scheduled payments.
- **Success messages to confirm AutoPay setup**: Users receive confirmation messages upon successful setup of AutoPay.

### ✅ Interactive Chatbot Assistance

- **Rule-based chatbot with a JSON decision tree**: Offers a structured and efficient way to handle user queries.
- **Handles FAQs (balance inquiries, transaction details, etc.)**: Provides quick answers to common questions.
- **Provides transaction insights & helps with navigation**: Assists users in understanding their transactions and navigating the app.

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
