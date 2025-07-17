import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../auth/authService";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No user data found. Please sign in.</p>
      </div>
    );
  }

  const getInitial = (email) => email?.charAt(0).toUpperCase();

  const handleLogout = async () => {
    await logoutUser();    // Firebase + localStorage logout
    logout();              // Clears React context user state
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-grayBg flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-bold mb-3">
            {getInitial(user.email)}
          </div>
          <h1 className="text-2xl font-semibold text-textDark">Welcome back!</h1>
          <p className="text-sm text-textLight mt-1">Manage your account settings</p>
        </div>

        <div className="space-y-4 text-sm">
          <div>
            <p className="text-textLight font-medium">Email</p>
            <p className="text-textDark">{user.email}</p>
          </div>

          <div>
            <p className="text-textLight font-medium">Sign-In Method</p>
            <p className="text-textDark">{user.method}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 w-full bg-danger text-white py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
