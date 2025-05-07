import { useEffect, useState } from "react";
import { Button } from "./Button";
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
    <>
      <div className="font-bold mt-3 mx-5 text-2xl text-gray-900 drop-shadow-md">
        Users
      </div>

      <div className="my-2 flex justify-center">
        <input
          type="text"
          placeholder="🔍 Search users..."
          onChange={(e) => setFilter(e.target.value)}
          className="w-full max-w-lg px-5 py-2 border border-gray-400 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
        />
      </div>

      <div className="mt-4 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-200">
          {users.length > 0 ? (
            users.map((user) => <User key={user._id} user={user} />)
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-gray-500">No users found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg">
            {user.firstName[0]}{user.lastName[0]}
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{user.firstName} {user.lastName}</h3>
          <p className="text-sm text-gray-500">@{user.firstName.toLowerCase()}{user.lastName.toLowerCase()}</p>
        </div>
      </div>
      <Button
        onClick={() => navigate(`/transfer?id=${user._id}&to=${user.firstName}`)}
        label="Send Money"
        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
      />
    </div>
  );
}

export default Users;
