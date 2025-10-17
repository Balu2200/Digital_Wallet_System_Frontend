import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import ErrorAlert from "../components/ErrorAlert";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Edit Mode States
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  // Two-Step Verification State
  const [twoStepEnabled, setTwoStepEnabled] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      setUser(response.data);
      setEditData({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
      });
      // Assume two-step is enabled if user is verified
      setTwoStepEnabled(response.data.isVerified);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Failed to load profile. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - reset to original data
      setEditData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async () => {
    setError("");
    setSuccessMessage("");
    setLoading(true);
    try {
      const response = await axios.put(`${BASE_URL}/profile/update`, editData, {
        withCredentials: true,
      });
      setUser(response.data.user);
      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Failed to update profile. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleTwoStepToggle = async () => {
    setSavingSettings(true);
    setError("");
    setSuccessMessage("");
    try {
      // Simulate API call - you can implement backend endpoint for this
      // For now, we'll just update the local state
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTwoStepEnabled(!twoStepEnabled);
      setSuccessMessage(
        `Two-step verification ${
          !twoStepEnabled ? "enabled" : "disabled"
        } successfully!`
      );
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Failed to update settings. Please try again.";
      setError(errorMessage);
    } finally {
      setSavingSettings(false);
    }
  };

  if (loading && !user) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="max-w-5xl mx-auto px-6 py-8 pt-24">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">
              My Profile
            </h1>
            <p className="text-secondary-600">
              Manage your account information and settings
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Dashboard
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6">
            <ErrorAlert
              message={error}
              type="error"
              onClose={() => setError("")}
            />
          </div>
        )}

        {successMessage && (
          <div className="mb-6">
            <ErrorAlert
              message={successMessage}
              type="success"
              onClose={() => setSuccessMessage("")}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Details */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-secondary-900">
                  Profile Information
                </h2>
                <button
                  onClick={handleEditToggle}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    isEditing
                      ? "bg-secondary-200 text-secondary-700 hover:bg-secondary-300"
                      : "bg-primary-600 text-white hover:bg-primary-700"
                  }`}
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
              </div>

              <div className="space-y-4">
                {/* Avatar */}
                <div className="flex items-center gap-6 pb-6 border-b border-secondary-200">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    {user?.firstName?.[0]}
                    {user?.lastName?.[0]}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-secondary-900">
                      {user?.firstName} {user?.lastName}
                    </h3>
                    <p className="text-secondary-600">{user?.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {user?.isVerified ? (
                        <>
                          <svg
                            className="w-5 h-5 text-accent-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-sm text-accent-600 font-medium">
                            Verified Account
                          </span>
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-5 h-5 text-yellow-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-sm text-yellow-600 font-medium">
                            Pending Verification
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Editable Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      First Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.firstName}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            firstName: e.target.value,
                          })
                        }
                        className="input-field w-full"
                      />
                    ) : (
                      <p className="text-secondary-900 font-medium py-2">
                        {user?.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Last Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.lastName}
                        onChange={(e) =>
                          setEditData({ ...editData, lastName: e.target.value })
                        }
                        className="input-field w-full"
                      />
                    ) : (
                      <p className="text-secondary-900 font-medium py-2">
                        {user?.lastName}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) =>
                          setEditData({ ...editData, email: e.target.value })
                        }
                        className="input-field w-full"
                      />
                    ) : (
                      <p className="text-secondary-900 font-medium py-2">
                        {user?.email}
                      </p>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="pt-4 border-t border-secondary-200">
                    <button
                      onClick={handleSaveProfile}
                      disabled={loading}
                      className="btn-primary w-full"
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Security Settings */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-secondary-900 mb-6">
                Security Settings
              </h2>

              <div className="space-y-6">
                {/* Two-Step Verification Toggle */}
                <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
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
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900 mb-1">
                        Two-Step Verification
                      </h3>
                      <p className="text-sm text-secondary-600">
                        Add an extra layer of security by requiring OTP
                        verification for each login
                      </p>
                      <span
                        className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                          twoStepEnabled
                            ? "bg-accent-100 text-accent-700"
                            : "bg-secondary-200 text-secondary-700"
                        }`}
                      >
                        {twoStepEnabled ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleTwoStepToggle}
                    disabled={savingSettings}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                      twoStepEnabled ? "bg-accent-600" : "bg-secondary-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        twoStepEnabled ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Additional Security Info */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex gap-3">
                    <svg
                      className="w-5 h-5 text-blue-600 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">
                        About Two-Step Verification
                      </h4>
                      <p className="text-sm text-blue-800">
                        When enabled, you'll receive a one-time password (OTP)
                        via email every time you log in. This helps protect your
                        account from unauthorized access.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Stats Sidebar */}
          <div className="space-y-6">
            {/* Account Info Card */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                Account Info
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-secondary-600 mb-1">
                    Member Since
                  </p>
                  <p className="text-sm font-medium text-secondary-900">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-secondary-600 mb-1">
                    Last Updated
                  </p>
                  <p className="text-sm font-medium text-secondary-900">
                    {user?.updatedAt
                      ? new Date(user.updatedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-secondary-600 mb-1">User ID</p>
                  <p className="text-xs font-mono text-secondary-900 break-all">
                    {user?._id}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate("/analytics")}
                  className="w-full flex items-center gap-3 p-3 bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-colors text-left"
                >
                  <svg
                    className="w-5 h-5 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <span className="font-medium text-secondary-900">
                    View Analytics
                  </span>
                </button>

                <button
                  onClick={() => navigate("/history")}
                  className="w-full flex items-center gap-3 p-3 bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-colors text-left"
                >
                  <svg
                    className="w-5 h-5 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="font-medium text-secondary-900">
                    Transaction History
                  </span>
                </button>

                <button
                  onClick={() => navigate("/autopay")}
                  className="w-full flex items-center gap-3 p-3 bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-colors text-left"
                >
                  <svg
                    className="w-5 h-5 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="font-medium text-secondary-900">
                    Scheduled Payments
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
