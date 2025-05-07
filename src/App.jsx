import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/transaction";
import Body from "./pages/Body";
import { UserContextProvider } from "./utils/Usercontext";
import Addbalance from "./pages/addbalance";
import TransactionHistory from "./pages/transactionsHistory";
import Chatbot from "./pages/chatbot";
import Autopay from "./pages/autopay";
import Otp from "./pages/Otp";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="otp" element={<Otp />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="transfer" element={<Transaction />} />
            <Route path="addbalance" element={<Addbalance />} />
            <Route path="history" element={<TransactionHistory />} />
            <Route path="help" element={<Chatbot />} />
            <Route path="autopay" element={<Autopay />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
