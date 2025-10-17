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
      setStatusMessage(
        error.response?.data?.message || "Failed to schedule payment"
      );
      setIsError(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/scheduled-payment/${id}`, {
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
    <div className="min-h-screen bg-secondary-50 py-8 px-4">
      <div className="max-w-7xl mx-auto mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Schedule Payment Form */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-secondary-900 mb-6">
              Schedule a Payment
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
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
                  className="input-field"
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
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Amount (₹)
                </label>
                <input
                  name="amount"
                  type="number"
                  placeholder="Enter amount"
                  onChange={handleChange}
                  value={formData.amount}
                  required
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Next Payment Date
                </label>
                <input
                  name="nextExecutionDate"
                  type="datetime-local"
                  onChange={handleChange}
                  value={formData.nextExecutionDate}
                  required
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Payment Frequency
                </label>
                <div className="flex gap-3">
                  {["daily", "weekly", "monthly"].map((freq) => (
                    <button
                      key={freq}
                      type="button"
                      onClick={() => handleFrequencyChange(freq)}
                      className={`flex-1 py-2.5 px-4 rounded-button text-sm font-medium transition-all duration-200 ${
                        formData.frequency === freq
                          ? "bg-primary-600 text-white shadow-soft"
                          : "bg-secondary-100 text-secondary-700 hover:bg-secondary-200"
                      }`}
                    >
                      {freq.charAt(0).toUpperCase() + freq.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn-primary w-full">
                Schedule Payment
              </button>
            </form>

            {statusMessage && (
              <div
                className={`mt-4 p-3 rounded-button text-sm font-medium ${
                  isError
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : "bg-accent-50 text-accent-700 border border-accent-200"
                }`}
              >
                {statusMessage}
              </div>
            )}
          </div>

          {/* Scheduled Payments List */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-secondary-900 mb-6">
              Scheduled Payments
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="border-b border-secondary-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-secondary-600 uppercase">
                      Recipient
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-secondary-600 uppercase">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-secondary-600 uppercase">
                      Frequency
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-secondary-600 uppercase">
                      Next Payment
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-secondary-600 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary-100">
                  {payments.length > 0 ? (
                    payments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-secondary-50">
                        <td className="px-4 py-4 text-secondary-900">
                          {payment.recipientName}
                        </td>
                        <td className="px-4 py-4 font-medium text-secondary-900">
                          ₹{payment.amount}
                        </td>
                        <td className="px-4 py-4 text-secondary-700">
                          <span className="badge-pending">
                            {payment.frequency.charAt(0).toUpperCase() +
                              payment.frequency.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-secondary-700 text-xs">
                          {new Date(payment.nextExecutionDate).toLocaleString()}
                        </td>
                        <td className="px-4 py-4">
                          <button
                            onClick={() => handleDelete(payment.id)}
                            className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-4 py-8 text-center text-secondary-500"
                      >
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
