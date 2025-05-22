import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/transaction";
import Body from "./pages/Body";
import { UserContextProvider } from "./utils/Usercontext";
import Addbalance from "./pages/addbalance";
import TransactionHistory from "./pages/transactionsHistory";
import PrivateRoute from "./pages/privateRoute";
import Chatbot from "./pages/chatbot";
import Autopay from "./pages/autopay";
import Otp from "./pages/Otp";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            {/* Public Routes */}
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="otp" element={<Otp />} />

            {/* Protected Routes */}
            <Route
              path="dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="transfer"
              element={
                <PrivateRoute>
                  <Transaction />
                </PrivateRoute>
              }
            />
            <Route
              path="addbalance"
              element={
                <PrivateRoute>
                  <Addbalance />
                </PrivateRoute>
              }
            />
            <Route
              path="history"
              element={
                <PrivateRoute>
                  <TransactionHistory />
                </PrivateRoute>
              }
            />
            <Route
              path="help"
              element={
                <PrivateRoute>
                  <Chatbot />
                </PrivateRoute>
              }
            />
            <Route
              path="autopay"
              element={
                <PrivateRoute>
                  <Autopay />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}


export default App;
