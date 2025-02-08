import { useEffect, useState } from "react";
import { Button } from "./Button";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(BASE_URL + "/profile/bulk");
      setUsers(Array.isArray(response.data.users) ? response.data.users : []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]); 
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="font-bold mt-6 mx-5 text-lg">Users</div>
      <div className="my-3">
        <input
          onChange={() => {}}
          type="text"
          placeholder="Search users..."
          className="w-1/2 mx-72 px-4 mx-3 py-1 border rounded-xl h-12  border-slate-200"
        />
      </div>
      <div>
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </>
  );
};

function User({ user }) {
  return (
    <div className="flex justify-between border-b p-2">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl font-semibold">
            {user.firstName[0]}
            {user.lastName[0]} 
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div className="font-medium">
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-full">
        <Button onClick={() => {}} label={"Send Money"} />
      </div>
    </div>
  );
}

export default Users;
