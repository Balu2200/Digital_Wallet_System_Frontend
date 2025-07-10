import Appbar from "../components/Appbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../utils/Usercontext";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";

const Body = () => {
  const { user, addUser } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    if (user) return;

    try {
      const response = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      addUser(response.data.user);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
      console.error("Error fetching user:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>; // Optional loading state
  }

  // Show default content if user is not logged in
  if (!user) {
    return (
      <div>
        <Appbar />
        <div style={{ padding: "20px" }}>
          <h1>Welcome to PaySwift</h1>
          <section>
            <h2>About Us</h2>
            <p>
              PaySwift is a secure digital wallet platform designed to provide
              seamless financial operations. Our mission is to simplify payments
              and enhance user experience with cutting-edge technology.
            </p>
          </section>
          <section>
            <h2>Contact Us</h2>
            <p>
              Have questions? Reach out to us at support@payswift.com or call us
              at +1-800-555-1234.
            </p>
          </section>
          <section>
            <h2>Payment Services</h2>
            <p>
              Enjoy fast and secure peer-to-peer transfers, autopayments, and
              real-time transaction tracking. Sign up to explore our features!
            </p>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <Outlet />
    </div>
  );
};

export default Body;
