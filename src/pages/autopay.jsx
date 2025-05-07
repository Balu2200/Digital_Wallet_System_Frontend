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
      await axios.post(
        `${BASE_URL}/scheduled-payments`,
        formData,
        { withCredentials: true }
      );
      setStatusMessage("Payment scheduled successfully!");
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
      setStatusMessage(error.response?.data?.message || "Failed to schedule payment");
      setIsError(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/scheduled-payments/${id}`, {
        withCredentials: true,
      });
      setStatusMessage("Payment deleted successfully!");
      setIsError(false);
      fetchPayments();
    } catch (error) {
      setStatusMessage("Failed to delete payment");
      setIsError(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-2 sm:py-8 sm:px-0">
      <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Schedule Payment Form */}
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule a Payment</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Recipient
                </label>
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a user</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.firstName} {user.lastName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (₹)
                </label>
                <input
                  name="amount"
                  type="number"
                  placeholder="Enter amount"
                  onChange={handleChange}
                  value={formData.amount}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Next Payment Date
                </label>
                <input
                  name="nextExecutionDate"
                  type="datetime-local"
                  onChange={handleChange}
                  value={formData.nextExecutionDate}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Frequency
                </label>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  {['daily', 'weekly', 'monthly'].map((freq) => (
                    <button
                      key={freq}
                      type="button"
                      onClick={() => handleFrequencyChange(freq)}
                      className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                        formData.frequency === freq
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {freq.charAt(0).toUpperCase() + freq.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                Schedule Payment
              </button>
            </form>

            {statusMessage && (
              <div
                className={`mt-4 p-3 rounded-lg text-sm font-medium ${
                  isError
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {statusMessage}
              </div>
            )}
          </div>

          {/* Scheduled Payments List */}
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Scheduled Payments</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recipient
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Frequency
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Next Payment
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payments.length > 0 ? (
                    payments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50">
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                          {payment.recipientName}
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                          ₹{payment.amount}
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                          {payment.frequency.charAt(0).toUpperCase() + payment.frequency.slice(1)}
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                          {new Date(payment.nextExecutionDate).toLocaleString()}
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleDelete(payment.id)}
                            className="text-red-600 hover:text-red-900 font-medium"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-3 sm:px-6 py-4 text-center text-gray-500">
                        No scheduled payments found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoPay;
