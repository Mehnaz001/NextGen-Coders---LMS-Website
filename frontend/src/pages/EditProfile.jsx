import React, { useState } from "react";
import home from "../assets/home.png";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {ClipLoader} from "react-spinners";
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
      if (photoUrl) {
        formData.append("photoUrl", photoUrl);
      }

      const { data } = await axios.post(
        `${serverUrl}/api/user/profile`,
        formData,
        {
          withCredentials: true,
        }
      );

      dispatch(setUserData(data));
      toast.success("Profile updated successfully");
      navigate("/profile");
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Background */}
      <img
        src={home}
        alt="bg"
        className="absolute inset-0 w-full h-full object-cover opacity-10"
      />

      <div className="relative max-w-3xl mx-auto px-4 py-10">
        {/* Back */}
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 text-gray-700 hover:text-black mb-6"
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-xl font-semibold mb-6">Edit Profile</h1>

          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="avatar"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-900 text-white flex items-center justify-center text-xl font-semibold">
                {getInitials(name)}
              </div>
            )}

            <label className="text-sm text-blue-600 cursor-pointer">
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
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">
              Username
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              value={userData.email}
              disabled
              className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-500"
            />
          </div>

          {/* Bio */}
          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-1">
              About You
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              onClick={() => navigate("/profile")}
              className="px-4 py-2 text-gray-600"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              onClick={handleEditProfile}
              disabled={loading}
              className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800 flex items-center gap-2"
            >
              {loading ? <ClipLoader size={18} color="#fff" /> : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
