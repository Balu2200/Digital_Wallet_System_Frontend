import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/account/analytics`, {
        withCredentials: true,
      });
      setAnalytics(response.data);
    } catch (err) {
      setError("Failed to fetch analytics data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  const {
    currentBalance,
    totalSent,
    totalReceived,
    successfulTransactions,
    failedTransactions,
    totalTransactions,
    monthlyData,
    recentTransactions,
    topCategories,
    netCashFlow,
  } = analytics;

  // Calculate max value for bar charts
  const maxMonthly = Math.max(
    ...monthlyData.map((m) => Math.max(m.sent, m.received))
  );

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="max-w-7xl mx-auto px-6 py-8 mt-28">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            Financial Analytics
          </h1>
          <p className="text-secondary-600">
            Track your spending, earnings, and financial trends
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Current Balance"
            value={`₹${currentBalance.toFixed(2)}`}
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
            color="primary"
          />
          <StatCard
            title="Total Sent"
            value={`₹${totalSent.toFixed(2)}`}
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            }
            color="red"
          />
          <StatCard
            title="Total Received"
            value={`₹${totalReceived.toFixed(2)}`}
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            }
            color="accent"
          />
          <StatCard
            title="Net Cash Flow"
            value={`₹${netCashFlow.toFixed(2)}`}
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            }
            color={netCashFlow >= 0 ? "accent" : "red"}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Trend Chart */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-secondary-900 mb-6">
              Monthly Trends (Last 6 Months)
            </h2>
            <div className="space-y-4">
              {monthlyData.map((month, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-secondary-700">
                      {month.month}
                    </span>
                    <div className="flex gap-4">
                      <span className="text-red-600">↑ ₹{month.sent}</span>
                      <span className="text-accent-600">
                        ↓ ₹{month.received}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 h-8">
                    <div className="flex-1 bg-secondary-100 rounded-lg overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-lg transition-all duration-500"
                        style={{
                          width: `${
                            maxMonthly > 0 ? (month.sent / maxMonthly) * 100 : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex-1 bg-secondary-100 rounded-lg overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent-400 to-accent-600 rounded-lg transition-all duration-500"
                        style={{
                          width: `${
                            maxMonthly > 0
                              ? (month.received / maxMonthly) * 100
                              : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transaction Status Pie Chart */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-secondary-900 mb-6">
              Transaction Overview
            </h2>
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 200 200" className="transform -rotate-90">
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="40"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="40"
                    strokeDasharray={`${
                      (successfulTransactions / totalTransactions) * 502.4
                    } 502.4`}
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="40"
                    strokeDasharray={`${
                      (failedTransactions / totalTransactions) * 502.4
                    } 502.4`}
                    strokeDashoffset={`-${
                      (successfulTransactions / totalTransactions) * 502.4
                    }`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-secondary-900">
                    {totalTransactions}
                  </span>
                  <span className="text-sm text-secondary-600">Total</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-accent-500 rounded-full"></div>
                <span className="text-sm text-secondary-700">
                  Success ({successfulTransactions})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-sm text-secondary-700">
                  Failed ({failedTransactions})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Recipients */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-secondary-900 mb-6">
              Top Recipients
            </h2>
            <div className="space-y-4">
              {topCategories.length > 0 ? (
                topCategories.map((category, index) => {
                  const maxCategory = Math.max(
                    ...topCategories.map((c) => c.amount)
                  );
                  return (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-secondary-700">
                          {category.name}
                        </span>
                        <span className="text-secondary-900 font-semibold">
                          ₹{category.amount.toFixed(2)}
                        </span>
                      </div>
                      <div className="h-3 bg-secondary-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary-500 to-primary-700 rounded-full transition-all duration-500"
                          style={{
                            width: `${(category.amount / maxCategory) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-secondary-500 text-center py-8">
                  No transaction data available
                </p>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-secondary-900 mb-6">
              Recent Activity
            </h2>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((txn, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          txn.type === "sent"
                            ? "bg-red-100 text-red-600"
                            : "bg-accent-100 text-accent-600"
                        }`}
                      >
                        {txn.type === "sent" ? (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 10l7-7m0 0l7 7m-7-7v18"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary-900">
                          {txn.type === "sent" ? "Sent to" : "Received from"}{" "}
                          {txn.name}
                        </p>
                        <p className="text-xs text-secondary-500">
                          {new Date(txn.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-semibold ${
                          txn.type === "sent"
                            ? "text-red-600"
                            : "text-accent-600"
                        }`}
                      >
                        {txn.type === "sent" ? "-" : "+"}₹
                        {txn.amount.toFixed(2)}
                      </p>
                      <span
                        className={`text-xs ${
                          txn.status === "success"
                            ? "text-accent-600"
                            : "text-red-600"
                        }`}
                      >
                        {txn.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-secondary-500 text-center py-8">
                  No recent activity
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    primary: "bg-primary-100 text-primary-600",
    accent: "bg-accent-100 text-accent-600",
    red: "bg-red-100 text-red-600",
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-3">
        <div
          className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center`}
        >
          {icon}
        </div>
      </div>
      <h3 className="text-sm font-medium text-secondary-600 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-secondary-900">{value}</p>
    </div>
  );
};

export default Analytics;
