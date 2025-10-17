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
      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        {/* Header with Profile Link */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">
              Financial Analytics
            </h1>
            <p className="text-secondary-600">
              Track your spending, earnings, and financial trends
            </p>
          </div>
          <a
            href="/profile"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-secondary-200 hover:border-primary-300 rounded-lg text-secondary-700 hover:text-primary-600 font-medium transition-all"
          >
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            My Profile
          </a>
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

        {/* Enhanced Line Chart - Balance Over Time */}
        <div className="card p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-secondary-900">
                Balance Trend
              </h2>
              <p className="text-sm text-secondary-500 mt-1">
                Your balance fluctuation over the last 6 months
              </p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                <span className="text-sm text-secondary-600">Balance</span>
              </div>
            </div>
          </div>
          <div className="relative h-64">
            <LineChart data={monthlyData} />
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Area Chart - Income vs Expenses */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-secondary-900 mb-6">
              Income vs Expenses
            </h2>
            <div className="relative h-72">
              <AreaChart data={monthlyData} maxValue={maxMonthly} />
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-accent-500 rounded"></div>
                <span className="text-sm text-secondary-700">Income</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm text-secondary-700">Expenses</span>
              </div>
            </div>
          </div>

          {/* Enhanced Bar Chart */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-secondary-900 mb-6">
              Monthly Comparison
            </h2>
            <div className="relative h-72">
              <BarChart data={monthlyData} maxValue={maxMonthly} />
            </div>
          </div>
        </div>

        {/* Donut Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Transaction Status Donut Chart */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-secondary-900 mb-6">
              Transaction Success Rate
            </h2>
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-56 h-56">
                <DonutChart
                  success={successfulTransactions}
                  failed={failedTransactions}
                  total={totalTransactions}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-accent-50 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-accent-500 rounded-full"></div>
                  <span className="text-xs font-medium text-accent-700">
                    Successful
                  </span>
                </div>
                <p className="text-2xl font-bold text-accent-700">
                  {successfulTransactions}
                </p>
                <p className="text-xs text-accent-600 mt-1">
                  {totalTransactions > 0
                    ? (
                        (successfulTransactions / totalTransactions) *
                        100
                      ).toFixed(1)
                    : 0}
                  %
                </p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-xs font-medium text-red-700">
                    Failed
                  </span>
                </div>
                <p className="text-2xl font-bold text-red-700">
                  {failedTransactions}
                </p>
                <p className="text-xs text-red-600 mt-1">
                  {totalTransactions > 0
                    ? ((failedTransactions / totalTransactions) * 100).toFixed(
                        1
                      )
                    : 0}
                  %
                </p>
              </div>
            </div>
          </div>

          {/* Spending Categories Donut */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-secondary-900 mb-6">
              Spending by Category
            </h2>
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-56 h-56">
                <CategoryDonutChart categories={topCategories} />
              </div>
            </div>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {topCategories.map((category, index) => {
                const colors = [
                  "bg-primary-500",
                  "bg-accent-500",
                  "bg-purple-500",
                  "bg-orange-500",
                  "bg-pink-500",
                ];
                const total = topCategories.reduce(
                  (sum, cat) => sum + cat.amount,
                  0
                );
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 ${
                          colors[index % colors.length]
                        } rounded`}
                      ></div>
                      <span className="text-secondary-700">
                        {category.name}
                      </span>
                    </div>
                    <span className="font-semibold text-secondary-900">
                      {total > 0
                        ? ((category.amount / total) * 100).toFixed(1)
                        : 0}
                      %
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Weekly Activity Heatmap */}
        <div className="card p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-secondary-900">
                Weekly Activity Heatmap
              </h2>
              <p className="text-sm text-secondary-500 mt-1">
                Transaction intensity throughout the week
              </p>
            </div>
          </div>
          <WeeklyHeatmap transactions={recentTransactions} />
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

// Line Chart Component
const LineChart = ({ data }) => {
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 100;
    const balance = item.received - item.sent;
    const maxBalance = Math.max(...data.map((d) => d.received - d.sent));
    const minBalance = Math.min(...data.map((d) => d.received - d.sent));
    const range = maxBalance - minBalance || 1;
    const y = 100 - ((balance - minBalance) / range) * 80;
    return { x, y, value: balance };
  });

  const pathD = points
    .map((point, i) => `${i === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  return (
    <div className="relative w-full h-full">
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-secondary-500 pr-2">
        <span>High</span>
        <span>Mid</span>
        <span>Low</span>
      </div>

      {/* Chart Area */}
      <div className="ml-12 h-full">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          <line
            x1="0"
            y1="20"
            x2="100"
            y2="20"
            stroke="#e5e7eb"
            strokeWidth="0.2"
          />
          <line
            x1="0"
            y1="50"
            x2="100"
            y2="50"
            stroke="#e5e7eb"
            strokeWidth="0.2"
          />
          <line
            x1="0"
            y1="80"
            x2="100"
            y2="80"
            stroke="#e5e7eb"
            strokeWidth="0.2"
          />

          {/* Area fill */}
          <path
            d={`${pathD} L 100 100 L 0 100 Z`}
            fill="url(#lineGradient)"
            opacity="0.2"
          />

          {/* Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#6366f1"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {points.map((point, i) => (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="1.5"
              fill="#6366f1"
              className="hover:r-2 transition-all"
            />
          ))}

          {/* Gradient definition */}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* X-axis labels */}
        <div className="flex justify-between text-xs text-secondary-500 mt-2">
          {data.map((item, i) => (
            <span key={i} className="w-12 text-center">
              {item.month.substring(0, 3)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Area Chart Component
const AreaChart = ({ data, maxValue }) => {
  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 300 200" className="w-full h-full">
        {/* Grid */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1="40"
            y1={40 + i * 30}
            x2="280"
            y2={40 + i * 30}
            stroke="#e5e7eb"
            strokeWidth="0.5"
          />
        ))}

        {/* Income Area */}
        <path
          d={
            data
              .map((item, i) => {
                const x = 40 + (i * 240) / (data.length - 1);
                const y = 160 - (item.received / maxValue) * 120;
                return `${i === 0 ? "M" : "L"} ${x} ${y}`;
              })
              .join(" ") + ` L 280 160 L 40 160 Z`
          }
          fill="url(#incomeGradient)"
        />

        {/* Expense Area */}
        <path
          d={
            data
              .map((item, i) => {
                const x = 40 + (i * 240) / (data.length - 1);
                const y = 160 - (item.sent / maxValue) * 120;
                return `${i === 0 ? "M" : "L"} ${x} ${y}`;
              })
              .join(" ") + ` L 280 160 L 40 160 Z`
          }
          fill="url(#expenseGradient)"
        />

        {/* Income Line */}
        <path
          d={data
            .map((item, i) => {
              const x = 40 + (i * 240) / (data.length - 1);
              const y = 160 - (item.received / maxValue) * 120;
              return `${i === 0 ? "M" : "L"} ${x} ${y}`;
            })
            .join(" ")}
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
        />

        {/* Expense Line */}
        <path
          d={data
            .map((item, i) => {
              const x = 40 + (i * 240) / (data.length - 1);
              const y = 160 - (item.sent / maxValue) * 120;
              return `${i === 0 ? "M" : "L"} ${x} ${y}`;
            })
            .join(" ")}
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
        />

        {/* Data points */}
        {data.map((item, i) => {
          const x = 40 + (i * 240) / (data.length - 1);
          const yIncome = 160 - (item.received / maxValue) * 120;
          const yExpense = 160 - (item.sent / maxValue) * 120;
          return (
            <g key={i}>
              <circle cx={x} cy={yIncome} r="3" fill="#10b981" />
              <circle cx={x} cy={yExpense} r="3" fill="#ef4444" />
            </g>
          );
        })}

        {/* X-axis labels */}
        {data.map((item, i) => {
          const x = 40 + (i * 240) / (data.length - 1);
          return (
            <text
              key={i}
              x={x}
              y="180"
              textAnchor="middle"
              fontSize="10"
              fill="#64748b"
            >
              {item.month.substring(0, 3)}
            </text>
          );
        })}

        {/* Y-axis labels */}
        {[0, 1, 2, 3, 4].map((i) => (
          <text
            key={i}
            x="30"
            y={45 + i * 30}
            textAnchor="end"
            fontSize="10"
            fill="#64748b"
          >
            {((maxValue * (4 - i)) / 4).toFixed(0)}
          </text>
        ))}

        {/* Gradients */}
        <defs>
          <linearGradient id="incomeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient
            id="expenseGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.05" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// Bar Chart Component
const BarChart = ({ data, maxValue }) => {
  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 300 200" className="w-full h-full">
        {/* Grid */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1="40"
            y1={40 + i * 30}
            x2="280"
            y2={40 + i * 30}
            stroke="#e5e7eb"
            strokeWidth="0.5"
          />
        ))}

        {/* Bars */}
        {data.map((item, i) => {
          const barWidth = 180 / data.length;
          const spacing = 60 / data.length;
          const x = 40 + i * (barWidth + spacing);
          const heightReceived = (item.received / maxValue) * 120;
          const heightSent = (item.sent / maxValue) * 120;

          return (
            <g key={i}>
              {/* Received Bar */}
              <rect
                x={x}
                y={160 - heightReceived}
                width={barWidth / 2.2}
                height={heightReceived}
                fill="url(#barGradientReceived)"
                rx="2"
              />
              {/* Sent Bar */}
              <rect
                x={x + barWidth / 2}
                y={160 - heightSent}
                width={barWidth / 2.2}
                height={heightSent}
                fill="url(#barGradientSent)"
                rx="2"
              />
              {/* Label */}
              <text
                x={x + barWidth / 2}
                y="180"
                textAnchor="middle"
                fontSize="10"
                fill="#64748b"
              >
                {item.month.substring(0, 3)}
              </text>
            </g>
          );
        })}

        {/* Y-axis labels */}
        {[0, 1, 2, 3, 4].map((i) => (
          <text
            key={i}
            x="30"
            y={45 + i * 30}
            textAnchor="end"
            fontSize="10"
            fill="#64748b"
          >
            {((maxValue * (4 - i)) / 4).toFixed(0)}
          </text>
        ))}

        {/* Gradients */}
        <defs>
          <linearGradient
            id="barGradientReceived"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient
            id="barGradientSent"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// Donut Chart Component
const DonutChart = ({ success, failed, total }) => {
  const successPercent = total > 0 ? (success / total) * 100 : 0;
  const failedPercent = total > 0 ? (failed / total) * 100 : 0;

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const successLength = (successPercent / 100) * circumference;
  const failedLength = (failedPercent / 100) * circumference;

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
      {/* Background circle */}
      <circle
        cx="100"
        cy="100"
        r={radius}
        fill="none"
        stroke="#f3f4f6"
        strokeWidth="30"
      />

      {/* Success arc */}
      <circle
        cx="100"
        cy="100"
        r={radius}
        fill="none"
        stroke="#10b981"
        strokeWidth="30"
        strokeDasharray={`${successLength} ${circumference}`}
        strokeLinecap="round"
        className="transition-all duration-500"
      />

      {/* Failed arc */}
      <circle
        cx="100"
        cy="100"
        r={radius}
        fill="none"
        stroke="#ef4444"
        strokeWidth="30"
        strokeDasharray={`${failedLength} ${circumference}`}
        strokeDashoffset={-successLength}
        strokeLinecap="round"
        className="transition-all duration-500"
      />

      {/* Center text */}
      <text
        x="100"
        y="95"
        textAnchor="middle"
        fontSize="36"
        fontWeight="bold"
        fill="#1e293b"
        className="transform rotate-90"
        style={{ transformOrigin: "100px 100px" }}
      >
        {total}
      </text>
      <text
        x="100"
        y="115"
        textAnchor="middle"
        fontSize="14"
        fill="#64748b"
        className="transform rotate-90"
        style={{ transformOrigin: "100px 100px" }}
      >
        Total
      </text>
    </svg>
  );
};

// Category Donut Chart Component
const CategoryDonutChart = ({ categories }) => {
  const total = categories.reduce((sum, cat) => sum + cat.amount, 0);
  const colors = ["#6366f1", "#10b981", "#a855f7", "#f97316", "#ec4899"];

  let currentOffset = 0;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
      {/* Background */}
      <circle
        cx="100"
        cy="100"
        r={radius}
        fill="none"
        stroke="#f3f4f6"
        strokeWidth="30"
      />

      {/* Category arcs */}
      {categories.map((category, index) => {
        const percent = total > 0 ? (category.amount / total) * 100 : 0;
        const arcLength = (percent / 100) * circumference;
        const color = colors[index % colors.length];

        const segment = (
          <circle
            key={index}
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="30"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={-currentOffset}
            strokeLinecap="round"
            className="transition-all duration-500 hover:opacity-80"
          />
        );

        currentOffset += arcLength;
        return segment;
      })}

      {/* Center circle */}
      <circle cx="100" cy="100" r="50" fill="white" />

      {/* Center text */}
      <text
        x="100"
        y="95"
        textAnchor="middle"
        fontSize="28"
        fontWeight="bold"
        fill="#1e293b"
        className="transform rotate-90"
        style={{ transformOrigin: "100px 100px" }}
      >
        ₹{(total / 1000).toFixed(1)}k
      </text>
      <text
        x="100"
        y="115"
        textAnchor="middle"
        fontSize="12"
        fill="#64748b"
        className="transform rotate-90"
        style={{ transformOrigin: "100px 100px" }}
      >
        Total Spent
      </text>
    </svg>
  );
};

// Weekly Heatmap Component
const WeeklyHeatmap = ({ transactions }) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Create activity map
  const activityMap = {};
  transactions.forEach((transaction) => {
    const date = new Date(transaction.createdAt);
    const day = date.getDay();
    const hour = date.getHours();
    const key = `${day}-${hour}`;
    activityMap[key] = (activityMap[key] || 0) + 1;
  });

  const maxActivity = Math.max(...Object.values(activityMap), 1);

  const getIntensityColor = (count) => {
    if (!count) return "#f3f4f6";
    const intensity = count / maxActivity;
    if (intensity > 0.75) return "#6366f1";
    if (intensity > 0.5) return "#818cf8";
    if (intensity > 0.25) return "#a5b4fc";
    return "#c7d2fe";
  };

  return (
    <div className="overflow-x-auto">
      <div className="inline-grid grid-cols-[auto_repeat(24,minmax(0,1fr))] gap-1 min-w-max">
        {/* Header - Hours */}
        <div className="col-span-1"></div>
        {hours.map((hour) => (
          <div key={hour} className="text-center">
            <span className="text-xs text-secondary-500">
              {hour % 6 === 0 ? `${hour}h` : ""}
            </span>
          </div>
        ))}

        {/* Heatmap Grid */}
        {days.map((day, dayIndex) => (
          <>
            <div key={day} className="flex items-center justify-end pr-2">
              <span className="text-xs font-medium text-secondary-600">
                {day}
              </span>
            </div>
            {hours.map((hour) => {
              const key = `${dayIndex}-${hour}`;
              const count = activityMap[key] || 0;
              return (
                <div
                  key={`${dayIndex}-${hour}`}
                  className="aspect-square rounded transition-all duration-200 hover:ring-2 hover:ring-primary-400 cursor-pointer"
                  style={{ backgroundColor: getIntensityColor(count) }}
                  title={`${day} ${hour}:00 - ${count} transactions`}
                />
              );
            })}
          </>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-2 mt-6">
        <span className="text-xs text-secondary-500">Less</span>
        <div className="flex gap-1">
          {[0, 0.25, 0.5, 0.75, 1].map((intensity, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded"
              style={{
                backgroundColor:
                  intensity === 0
                    ? "#f3f4f6"
                    : intensity > 0.75
                    ? "#6366f1"
                    : intensity > 0.5
                    ? "#818cf8"
                    : intensity > 0.25
                    ? "#a5b4fc"
                    : "#c7d2fe",
              }}
            />
          ))}
        </div>
        <span className="text-xs text-secondary-500">More</span>
      </div>
    </div>
  );
};

export default Analytics;
