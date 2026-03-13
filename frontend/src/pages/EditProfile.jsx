import React, { useState } from "react";
import home from "../assets/home.png";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { toast } from "react-toastify";
import { setUserData } from "../redux/userSlice.js";
import { serverUrl } from "../App.jsx";

const EditProfile = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState(userData.name || "");
  const [description, setDescription] = useState(userData.description || "");
  const [photoPreview, setPhotoPreview] = useState(userData.photoUrl || null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPhotoUrl(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleEditProfile = async () => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (photoUrl) formData.append("photoUrl", photoUrl);

      const { data } = await axios.post(
        `${serverUrl}/api/user/profile`,
        formData,
        { withCredentials: true }
      );

      dispatch(setUserData(data));
      toast.success("Profile updated successfully");
      navigate("/profile");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-16">

      {/* Background */}
      <img
        src={home}
        alt="bg"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90 -z-10"></div>

      <div className="w-full max-w-3xl">

        {/* Back */}
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 text-gray-300 hover:text-orange-500 transition mb-6"
        >
          <FaArrowLeft />
          Back
        </button>

        {/* Card */}
        <div className="bg-black/60 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8 text-white shadow-xl hover:border-orange-500 transition">

          <h1 className="text-2xl font-bold mb-8">Edit Profile</h1>

          {/* Avatar */}
          <div className="flex items-center gap-4 mb-8">

            {photoPreview ? (
              <img
                src={photoPreview}
                alt="avatar"
                className="w-20 h-20 rounded-full object-cover border-2 border-orange-500"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-orange-500 text-black flex items-center justify-center text-xl font-bold border-2 border-orange-500">
                {getInitials(name)}
              </div>
            )}

            <label className="text-sm text-orange-500 cursor-pointer hover:underline">
              Change Avatar
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </label>

          </div>

          {/* Username */}
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-1">
              Username
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:border-orange-500 outline-none"
            />

          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-1">
              Email
            </label>

            <input
              type="email"
              value={userData.email}
              disabled
              className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-gray-400"
            />

          </div>

          {/* Bio */}
          <div className="mb-8">
            <label className="block text-sm text-gray-400 mb-1">
              About You
            </label>

            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:border-orange-500 outline-none"
            />

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">

            <button
              onClick={() => navigate("/profile")}
              disabled={loading}
              className="px-4 py-2 text-gray-400 hover:text-white"
            >
              Cancel
            </button>

            <button
              onClick={handleEditProfile}
              disabled={loading}
              className="px-6 py-2 bg-orange-500 text-black rounded-lg font-semibold hover:bg-orange-400 flex items-center gap-2 transition"
            >
              {loading ? (
                <ClipLoader size={18} color="black" />
              ) : (
                "Save Changes"
              )}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default EditProfile;
