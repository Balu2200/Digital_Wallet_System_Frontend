import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [filter, setFilter] = useState("");

  const fetchLoggedInUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      setLoggedInUserId(response.data._id);
      fetchUsers(response.data._id, filter);
    } catch (error) {
      console.error("Error fetching logged-in user:", error);
    }
  };

  const fetchUsers = async (userId, searchFilter) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/profile/bulk?filter=${searchFilter}`,
        { withCredentials: true }
      );
      const allUsers = Array.isArray(response.data.users)
        ? response.data.users
        : [];

      const filteredUsers = allUsers.filter((user) => user._id !== userId);
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    if (loggedInUserId) {
      fetchUsers(loggedInUserId, filter);
    }
  }, [filter]);

  return (
    <div className="space-y-6">
      {/* Professional Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-secondary-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search contacts by name..."
          onChange={(e) => setFilter(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 text-base border border-secondary-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm bg-white transition-all duration-200"
        />
      </div>

      {/* Grid Layout for Contacts */}
      {users.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {users.map((user) => (
            <User key={user._id} user={user} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-secondary-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <p className="text-secondary-500 text-lg">No contacts found</p>
          <p className="text-secondary-400 text-sm mt-2">
            Try adjusting your search
          </p>
        </div>
      )}
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/transfer?id=${user._id}&to=${user.firstName}`)}
      className="bg-white rounded-xl p-5 border border-secondary-100 hover:border-primary-300 hover:shadow-md transition-all duration-200 cursor-pointer group"
    >
      <div className="flex flex-col items-center text-center gap-3">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform duration-200">
            {user.firstName[0]}
            {user.lastName[0]}
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent-500 border-2 border-white rounded-full"></div>
        </div>
        <div>
          <h3 className="font-semibold text-secondary-900 text-base">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-xs text-secondary-500 mt-1">
            @{user.firstName.toLowerCase()}
            {user.lastName.toLowerCase()}
          </p>
        </div>
        <div className="mt-2 text-primary-600 text-sm font-medium group-hover:text-primary-700 flex items-center gap-1">
          <span>Send Money</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Users;
