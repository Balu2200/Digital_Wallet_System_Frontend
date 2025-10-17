import { useUser } from "../utils/Usercontext";
import { useNavigate } from "react-router-dom";

const Appbar = () => {
  const { user, removeUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeUser();
    navigate("/login");
  };

  const NavButton = ({ onClick, icon, label, variant = "ghost" }) => {
    const baseClasses =
      "inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-button transition-all duration-200 whitespace-nowrap";
    const variants = {
      ghost: "text-secondary-600 hover:text-primary-600 hover:bg-primary-50",
      primary: "bg-primary-600 text-white hover:bg-primary-700 shadow-soft",
      accent: "bg-accent-600 text-white hover:bg-accent-700 shadow-soft",
    };

    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variants[variant]}`}
      >
        {icon}
        <span className="hidden lg:inline">{label}</span>
      </button>
    );
  };

  return (
    <>
      <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2 bg-white/90 backdrop-blur-lg border border-secondary-200 shadow-strong rounded-full px-6 py-2 flex items-center gap-3 max-w-5xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <span className="text-xl font-bold text-secondary-900 hidden sm:inline">
            PayVault
          </span>
        </div>
        {/* Navigation */}
        <div className="flex items-center gap-1.5 ml-auto">
          <NavButton
            onClick={() => navigate("/dashboard")}
            label="Dashboard"
            variant="ghost"
            icon={
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            }
          />
          <NavButton
            onClick={() => navigate("/autopay")}
            label="Autopay"
            variant="ghost"
            icon={
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />
          <NavButton
            onClick={() => navigate("/analytics")}
            label="Analytics"
            variant="ghost"
            icon={
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            }
          />
          <NavButton
            onClick={() => navigate("/history")}
            label="History"
            variant="ghost"
            icon={
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            }
          />
          {user ? (
            <NavButton
              onClick={handleLogout}
              label="Logout"
              variant="ghost"
              icon={
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              }
            />
          ) : (
            <NavButton
              onClick={() => navigate("/login")}
              label="Login"
              variant="primary"
              icon={
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
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
              }
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Appbar;
