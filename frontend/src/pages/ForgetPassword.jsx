import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Step 1
  const sendOTP = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/sendotp",
        { email },
        { withCredentials: true }
      );

      toast.success(result.data.message);
      setStep(2);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  // Step 2
  const verifyOTP = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/verifyotp",
        { email, otp },
        { withCredentials: true }
      );

      toast.success(result.data.message);
      setStep(3);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 3
  const resetPassword = async () => {
    if (newPassword !== conPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const result = await axios.post(
        serverUrl + "/api/auth/resetpassword",
        { email, newPassword },
        { withCredentials: true }
      );

      toast.success(result.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "mt-1 w-full px-4 py-2 bg-black border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500";

  const cardStyle =
    "bg-white/5 backdrop-blur-md border border-white/10 shadow-xl rounded-2xl p-8 max-w-md w-full";

  const buttonStyle =
    "w-full bg-orange-500 hover:bg-orange-400 text-black font-semibold py-2 rounded-md transition flex items-center justify-center";

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 text-white">

      {step === 1 && (
        <div className={cardStyle}>
          <h2 className="text-2xl font-bold mb-6 text-center">
            Forgot Password
          </h2>

          <form
            className="space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="text-sm text-gray-400">
                Enter your Email
              </label>
              <input
                type="email"
                className={inputStyle}
                placeholder="you@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <button
              className={buttonStyle}
              onClick={sendOTP}
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} color="black" /> : "Send OTP"}
            </button>
          </form>

          <div
            className="text-sm mt-5 text-center text-gray-400 hover:text-orange-400 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </div>
        </div>
      )}

      {step === 2 && (
        <div className={cardStyle}>
          <h2 className="text-2xl font-bold mb-6 text-center">
            Verify OTP
          </h2>

          <form
            className="space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="text-sm text-gray-400">
                Enter the OTP sent to your email
              </label>

              <input
                type="text"
                className={inputStyle}
                placeholder="****"
                required
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />
            </div>

            <button
              className={buttonStyle}
              onClick={verifyOTP}
              disabled={loading}
            >
              {loading ? (
                <ClipLoader size={20} color="black" />
              ) : (
                "Verify OTP"
              )}
            </button>
          </form>

          <div
            className="text-sm mt-5 text-center text-gray-400 hover:text-orange-400 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </div>
        </div>
      )}

      {step === 3 && (
        <div className={cardStyle}>
          <h2 className="text-2xl font-bold mb-2 text-center">
            Reset Password
          </h2>

          <p className="text-sm text-gray-400 text-center mb-6">
            Enter a new password for your account
          </p>

          <form
            className="space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="text-sm text-gray-400">
                New Password
              </label>

              <input
                type="password"
                className={inputStyle}
                placeholder="********"
                required
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">
                Confirm Password
              </label>

              <input
                type="password"
                className={inputStyle}
                placeholder="********"
                required
                onChange={(e) => setConPassword(e.target.value)}
                value={conPassword}
              />
            </div>

            <button
              className={buttonStyle}
              onClick={resetPassword}
              disabled={loading}
            >
              {loading ? (
                <ClipLoader size={20} color="black" />
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          <div
            className="text-sm mt-5 text-center text-gray-400 hover:text-orange-400 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;