import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const AutoPay = () => {
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const [formData, setFormData] = useState({
    recipient: "",
    recipientName: "",
    amount: "",
    frequency: "daily",
    nextExecutionDate: "",
  });

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/profile/bulk`, {
        withCredentials: true,
      });
      setUsers(Array.isArray(response.data.users) ? response.data.users : []);
    } catch (error) {
      console.error("Error fetching users", error);
      setUsers([]);
    }
  };

  const fetchPayments = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/scheduled-payments`, {
        withCredentials: true,
      });
      setPayments(data);
    } catch (error) {
      console.error("Error fetching payments", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchPayments();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFrequencyChange = (frequency) => {
    setFormData({ ...formData, frequency });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/schedule-payment`, formData, {
        withCredentials: true,
      });
      setStatusMessage("Autopay has been scheduled successfully");
      setIsError(false);
      fetchPayments();
      setFormData({
        recipient: "",
        recipientName: "",
        amount: "",
        frequency: "daily",
        nextExecutionDate: "",
      });
    } catch (error) {
      console.error("Error scheduling payment", error);
      setStatusMessage("Something went wrong, please try again!");
      setIsError(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/scheduled-payment/${id}`, {
        withCredentials: true,
      });
      fetchPayments();
      setStatusMessage("Autopay has been deleted successfully");
      setIsError(false);
    } catch (error) {
      console.error("Error deleting payment", error);
      setStatusMessage("Failed to delete autopay");
      setIsError(true);
    }
  };

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => setStatusMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 text-center">
        <h2 className="text-xl font-bold mb-4">Schedule a Payment</h2>
        <form onSubmit={handleSubmit}>
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
            className="w-full p-2 border rounded mt-2"
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
          <input
            name="nextExecutionDate"
            type="datetime-local"
            onChange={handleChange}
            value={formData.nextExecutionDate}
            required
            className="w-full p-2 rounded-md my-2 border"
          />
          <div className="flex justify-center gap-2 mt-2">
            <button
              type="button"
              className={`p-2 rounded ${
                formData.frequency === "daily"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleFrequencyChange("daily")}
            >
              Daily
            </button>
            <button
              type="button"
              className={`p-2 rounded ${
                formData.frequency === "weekly"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleFrequencyChange("weekly")}
            >
              Weekly
            </button>
            <button
              type="button"
              className={`p-2 rounded ${
                formData.frequency === "monthly"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleFrequencyChange("monthly")}
            >
              Monthly
            </button>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full mt-4"
          >
            Schedule Payment
          </button>
        </form>
        {statusMessage && (
          <div className={isError ? "text-red-400" : "text-green-600"}>
            {statusMessage}
          </div>
        )}
      </div>
      <h2 className="text-xl font-bold mt-6">Scheduled Payments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Recipient</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Frequency</th>
              <th className="border p-2">Next Execution Date</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment.id} className="text-center border-t">
                  <td>{payment.recipientName}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.frequency}</td>
                  <td>
                    {new Date(payment.nextExecutionDate).toLocaleString()}
                  </td>
                  <td>
                    <button
                      className="text-red-500"
                      onClick={() => handleDelete(payment.id)}
                    >
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No scheduled payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AutoPay;
