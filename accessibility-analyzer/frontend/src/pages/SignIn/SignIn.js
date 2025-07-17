import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { FcGoogle } from "react-icons/fc";
import { googleLogin, emailLogin } from "../../auth/authService";
import { useAuth } from "../../context/authContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSwitchAccountModal, setShowSwitchAccountModal] = useState(false);
  const [showNoAccountModal, setShowNoAccountModal] = useState(false);

  const navigate = useNavigate();
  const { login, user } = useAuth();

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setError(null);

    if (user) {
      setShowSwitchAccountModal(true);
      return;
    }

    try {
      const userCred = await emailLogin(email, password);
      login({ email: userCred.email, method: "Email/Password" });
      navigate("/analyze");
    } catch (err) {
      console.error("Email login error:", err.code, err.message);

      if (err.code === "auth/user-not-found") {
        setShowNoAccountModal(true);
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else {
        setError("Email/Password sign-in failed. Please try again.");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setGoogleLoading(true);

    if (user) {
      setShowSwitchAccountModal(true);
      setGoogleLoading(false);
      return;
    }

    try {
      const userCred = await googleLogin();
      login({ email: userCred.email, method: "Google Account" });
      navigate("/analyze");
    } catch (err) {
      console.error("Google login error:", err);
      setError("Google Sign-In failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-grayBg px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-primaryDark mb-6 text-center">
          Sign In to Analyze
        </h2>

        <button
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className="w-full border flex items-center justify-center gap-2 px-4 py-2 rounded hover:bg-gray-50 transition mb-6"
        >
          <FcGoogle className="text-2xl" />
          <span className="text-sm font-medium text-textDark">
            {googleLoading ? "Signing in..." : "Continue with Google"}
          </span>
        </button>

        <div className="text-center text-xs text-textLight mb-4">
          or sign in with email
        </div>

        <form onSubmit={handleEmailSignIn} className="space-y-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
            className="w-full px-4 py-2 border rounded"
          />

          <Button
            text="Sign In"
            className="w-full bg-primary hover:bg-primaryDark text-white"
          />
        </form>

        {error && (
          <p className="text-sm text-danger text-center mt-4">{error}</p>
        )}

        <p className="text-sm text-center text-textLight mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-primary hover:underline">
            Sign Up
          </a>
        </p>
      </div>

      {showSwitchAccountModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="switch-account-title"
        >
          <div className="bg-white p-6 rounded shadow text-center max-w-sm">
            <h3
              id="switch-account-title"
              className="text-lg font-semibold mb-4 text-primaryDark"
            >
              Already Logged In
            </h3>
            <p>
              You are already logged in. Please log out first to sign in with a
              different account.
            </p>
            <Button
              text="Okay"
              onClick={() => setShowSwitchAccountModal(false)}
              className="bg-primary text-white mt-4"
            />
          </div>
        </div>
      )}

      {showNoAccountModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow text-center max-w-sm">
            <h3 className="text-lg font-semibold mb-4 text-primaryDark">
              Account Not Found
            </h3>
            <p>No account exists with this email. Please sign up first.</p>
            <Button
              text="Go to Sign Up"
              onClick={() => navigate("/signup")}
              className="bg-primary text-white mt-4"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default SignIn;
