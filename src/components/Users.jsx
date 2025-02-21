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

      <div className="shadow-2xl mt-4 bg-gradient-to-r from-gray-50 to-gray-100 shadow-gray-700 mx-4 rounded-xl p-4">
        <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-200 space-y-2 pb-10">
          {users.length > 0 ? (
            users.map((user) => <User key={user._id} user={user} />)
          ) : (
            <p className="text-center text-gray-500 mt-4">No users found</p>
          )}
        </div>
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between border-b p-2 bg-gradient-to-r from-white to-gray-50">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-indigo-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl font-semibold text-indigo-900">
            {user.firstName[0]}
            {user.lastName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div className="font-medium text-gray-800">
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center h-full">
        <Button
          onClick={(e) => {
            navigate(`/transfer?id=${user._id}&to=${user.firstName}`);
          }}
          label={"Send Money"}
          className="bg-gradient-to-r from-green-500 to-emerald-700 hover:from-green-600 hover:to-emerald-800 text-white font-medium py-2 px-4 rounded transition-all"
        />
      </div>
    </div>
  );
}

export default Users;
