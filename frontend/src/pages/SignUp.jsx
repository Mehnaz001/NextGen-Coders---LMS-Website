import React, { useState } from "react";
import nextLogo from "../assets/NextLogo(Dark).png";
import google from "../assets/google.png";
import { IoEyeOutline, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await axios.post(
        serverUrl + "/api/auth/signup",
        { name, email, password, role },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data));
      setLoading(false);
      navigate("/");
      toast.success("Account created successfully");
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  const googleSignUp = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;

      const result = await axios.post(
        serverUrl + "/api/auth/googleauth",
        { name: user.displayName, email: user.email, role },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data));
      navigate("/");
      toast.success("Signed in with Google");
    } catch (error) {
      toast.error("Google Signin Failed");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">

      <form
        onSubmit={handleSignUp}
        className="w-full max-w-4xl bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden"
      >

        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col gap-5 justify-center">

          <div>
            <h1 className="text-3xl font-bold text-white">
              Create your account
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Join NextGen Coders and start learning
            </p>
          </div>

          {/* NAME */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-orange-500 outline-none w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-orange-500 outline-none w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-1 relative">
            <label className="text-sm text-gray-300">Password</label>

            <input
              type={show ? "text" : "password"}
              placeholder="Enter password"
              className="bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-orange-500 outline-none w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {show ? (
              <IoEyeOff
                onClick={() => setShow(false)}
                className="absolute right-3 bottom-2.5 text-gray-400 cursor-pointer"
              />
            ) : (
              <IoEyeOutline
                onClick={() => setShow(true)}
                className="absolute right-3 bottom-2.5 text-gray-400 cursor-pointer"
              />
            )}
          </div>

          {/* ROLE */}
          <div className="flex gap-4 pt-2">

            <span
              onClick={() => setRole("student")}
              className={`px-4 py-2 rounded-lg border cursor-pointer transition
              ${
                role === "student"
                  ? "bg-orange-500 text-black border-orange-500"
                  : "border-white/10 text-gray-300"
              }`}
            >
              Student
            </span>

            <span
              onClick={() => setRole("educator")}
              className={`px-4 py-2 rounded-lg border cursor-pointer transition
              ${
                role === "educator"
                  ? "bg-orange-500 text-black border-orange-500"
                  : "border-white/10 text-gray-300"
              }`}
            >
              Educator
            </span>

          </div>

          {/* SIGNUP BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-400 text-black font-semibold py-2 rounded-lg flex items-center justify-center mt-2"
          >
            {loading ? <ClipLoader size={20} color="black" /> : "Sign Up"}
          </button>

          {/* DIVIDER */}
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <div className="flex-1 h-[1px] bg-white/10"></div>
            Or continue
            <div className="flex-1 h-[1px] bg-white/10"></div>
          </div>

          {/* GOOGLE LOGIN */}
          <div
            onClick={googleSignUp}
            className="flex items-center bg-white justify-center  border border-white/10 py-2 rounded-lg cursor-pointer hover:border-orange-500 transition"
          >
            <img src={google} className="w-6" alt="google" />
            <span className="text-gray-500">oogle</span>
          </div>

          {/* LOGIN LINK */}
          <p className="text-gray-400 text-sm text-center md:text-left">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-orange-500 cursor-pointer"
            >
              Login
            </span>
          </p>

        </div>

        {/* RIGHT SIDE (DESKTOP ONLY) */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-black relative p-10">

          <div className="absolute w-60 h-60 bg-orange-500/20 blur-3xl rounded-full"></div>

          <img
            src={nextLogo}
            alt="NextGen Coders"
            className="w-52 relative z-10"
          />

        </div>

      </form>
    </div>
  );
};

export default SignUp;
