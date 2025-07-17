import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../auth/firebase";
import { useAuth } from "../../context/authContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSwitchAccountModal, setShowSwitchAccountModal] = useState(false);

  const navigate = useNavigate();
  const { user, login } = useAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    if (user) {
      setShowSwitchAccountModal(true);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      login({ email: userCredential.user.email, method: "Email/Password" });

      setShowSuccessModal(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error("Sign up error:", err);
      setError("Sign up failed. Please try again.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-grayBg px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-primaryDark mb-6 text-center">
          Sign Up
        </h2>

        <form onSubmit={handleSignUp} className="space-y-5">
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
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
            className="w-full px-4 py-2 border rounded"
          />

          <Button
            text="Sign Up"
            className="w-full bg-primary hover:bg-primaryDark text-white"
          />
        </form>

        {error && (
          <p className="text-sm text-danger text-center mt-4">{error}</p>
        )}
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow text-center max-w-sm">
            <h3 className="text-lg font-semibold mb-4 text-primaryDark">
              Sign Up Successful!
            </h3>
            <p>Redirecting to home page...</p>
          </div>
        </div>
      )}

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
    </section>
  );
};

export default SignUp;
