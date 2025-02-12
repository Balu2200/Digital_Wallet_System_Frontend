import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const AutoPay = () => {
  const [filteredUsers, setFilteredUsers] = useState("");
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [formData, setFormData] = useState({
    recipient: "",
    recipientName: "",
    amount: "",
    frequency: "daily",
    nextExecutionDate: "",
  });

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/profile/bulk?filter=${filteredUsers}`,
        { withCredentials: true }
      );
      setUsers(Array.isArray(response.data.users) ? response.data.users : []);
    } catch (error) {
      console.error("Error fetching users", error);
      setUsers([]);
    }
  };

  const fetchPayments = async() =>{
    try{
        const { data } = await axios.get(`${BASE_URL}/scheduled-payments`, {
          withCredentials: true,
        });
        setPayments(data);
    } 
    catch(error){
      console.error("Error fetching users", error);
    }
  }

  useEffect(() => {
    fetchUsers();
    fetchPayments();
  }, [filteredUsers]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/schedule-payment`, formData, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error scheduling payment", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 text-center">
        <h2 className="text-xl font-bold mb-4">Schedule a Payment</h2>
        <form onSubmit={handleSubmit}>
          <div className="my-2 flex justify-center">
            <input
              type="text"
              placeholder="🔍 Search users..."
              onChange={(e) => setFilteredUsers(e.target.value.trim())} // ✅ Trim input
              className="w-full max-w-lg px-5 py-2 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            />
          </div>
          <select
            name="recipient"
            onChange={(e) => {
              const selectedUser = users.find(
                (user) => user._id === e.target.value
              );
              setFormData({
                ...formData,
                recipient: e.target.value,
                recipientName: selectedUser
                  ? `${selectedUser.firstName} ${selectedUser.lastName}`
                  : "",
              });
            }}
            className="w-full p-2 border rounded"
          >
            <option value="">Select the user</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
          <input
            name="amount"
            type="number"
            placeholder="Amount"
            onChange={handleChange}
            value={formData.amount}
            required
            className="w-full p-2 rounded-md my-2 border"
          />
          <select
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <input
            name="nextExecutionDate"
            type="datetime-local"
            onChange={handleChange}
            value={formData.nextExecutionDate}
            required
            className="w-full p-2 rounded-md my-2 border"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full mt-4"
          >
            Schedule Payment
          </button>
        </form>
      </div>
      <h2 className="text-xl font-bold mt-6">Scheduled Payments</h2>
      <div className="bg-white shadow-lg rounded-lg p-4">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Recipient</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Frequency</th>
              <th className="border p-2">Next Execution Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) =>(
              <tr key={payment._id} className="text-center border-t">
                  <td>{payment.recipientName}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.frequency}</td>
                  <td>{payment.nextExecutionDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AutoPay;
