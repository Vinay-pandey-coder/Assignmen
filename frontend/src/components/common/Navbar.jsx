import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/dashboard" className="text-xl font-bold">
          Task Management
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link to="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link to="/tasks" className="hover:underline">
            My Tasks
          </Link>
          <Link to="/profile" className="hover:underline">
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-lg font-medium hover:bg-red-600"
          >
            Logout
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <HiX className="h-6 w-6 text-white" />
            ) : (
              <HiMenu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-blue-600">
          <Link
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className="block hover:underline"
          >
            Dashboard
          </Link>
          <Link
            to="/tasks"
            onClick={() => setIsOpen(false)}
            className="block hover:underline"
          >
            My Tasks
          </Link>
          <Link
            to="/profile"
            onClick={() => setIsOpen(false)}
            className="block hover:underline"
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 px-4 py-2 rounded-lg font-medium hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
